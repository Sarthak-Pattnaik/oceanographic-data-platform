import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Activity, Shield, AlertTriangle } from 'lucide-react';

export default function SiteStats({ sites, loading }) {
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
        total: sites.length,
        active: sites.filter(s => s.site_status === 'Active').length,
        protected: sites.filter(s => s.site_status === 'Protected').length,
        threatened: sites.filter(s => s.site_status === 'Threatened').length,
        avgBiodiversity: sites.reduce((sum, s) => sum + (s.biodiversity_index || 0), 0) / sites.length
    };

    const statCards = [
        {
            title: "Total Sites",
            value: stats.total,
            icon: MapPin,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            title: "Active Sites",
            value: stats.active,
            icon: Activity,
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            title: "Protected Areas",
            value: stats.protected,
            icon: Shield,
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            title: "Avg Biodiversity",
            value: `${stats.avgBiodiversity.toFixed(1)}%`,
            icon: AlertTriangle,
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