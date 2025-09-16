import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, DollarSign, Target, TrendingUp } from 'lucide-react';

export default function ProjectStats({ projects, loading }) {
    if (loading) {
        return (
            <div className="grid md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const stats = {
        total: projects.length,
        active: projects.filter(p => p.status === 'Active').length,
        totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
        avgSuccess: projects.reduce((sum, p) => sum + (p.success_rate || 0), 0) / projects.length
    };

    const statCards = [
        {
            title: "Total Projects",
            value: stats.total,
            icon: Shield,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            title: "Active Projects",
            value: stats.active,
            icon: Target,
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            title: "Total Budget",
            value: `$${(stats.totalBudget / 1000000).toFixed(1)}M`,
            icon: DollarSign,
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            title: "Avg Success Rate",
            value: `${stats.avgSuccess.toFixed(1)}%`,
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        }
    ];

    return (
        <div className="grid md:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-2">
                                        {stat.title}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}