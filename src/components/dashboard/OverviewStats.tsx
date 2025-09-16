import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Fish, MapPin, Shield, AlertTriangle } from 'lucide-react';

export default function OverviewStats({ stats, loading }) {
    const statCards = [
        {
            title: "Total Species",
            value: stats.totalSpecies,
            icon: Fish,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            title: "Research Sites",
            value: stats.researchSites,
            icon: MapPin,
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            title: "Active Projects",
            value: stats.activeProjects,
            icon: Shield,
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            title: "Threatened Species",
            value: stats.threatenedSpecies,
            icon: AlertTriangle,
            color: "text-red-600",
            bgColor: "bg-red-100"
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                    {loading ? (
                                        <Skeleton className="h-8 w-16" />
                                    ) : (
                                        <p className="text-3xl font-bold text-gray-900">
                                            {stat.value.toLocaleString()}
                                        </p>
                                    )}
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