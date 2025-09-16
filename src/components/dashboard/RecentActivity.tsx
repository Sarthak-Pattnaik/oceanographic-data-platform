import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Fish, Shield, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';

export default function RecentActivity({ projects, species, loading }) {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    // Generate recent activity items
    const activities = [];

    // Add recent projects
    projects.slice(0, 3).forEach(project => {
        activities.push({
            type: 'project',
            title: `${project.project_name} project ${project.status.toLowerCase()}`,
            subtitle: `Conservation initiative targeting ${project.target_species?.join(', ') || 'multiple species'}`,
            date: project.start_date,
            icon: Shield,
            status: project.status
        });
    });

    // Add species activities based on conservation status
    species.slice(0, 2).forEach(spec => {
        const isEndangered = ['Endangered', 'Critically Endangered'].includes(spec.conservation_status);
        activities.push({
            type: 'species',
            title: `${spec.common_name} status updated`,
            subtitle: `Conservation status: ${spec.conservation_status}`,
            date: new Date().toISOString().split('T')[0], // Mock recent date
            icon: isEndangered ? TrendingDown : TrendingUp,
            status: spec.conservation_status
        });
    });

    // Sort by most recent
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    const getStatusColor = (status, type) => {
        if (type === 'project') {
            switch (status) {
                case 'Active': return 'bg-green-100 text-green-800';
                case 'Planning': return 'bg-blue-100 text-blue-800';
                case 'Completed': return 'bg-purple-100 text-purple-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        } else {
            switch (status) {
                case 'Least Concern': return 'bg-green-100 text-green-800';
                case 'Near Threatened': return 'bg-yellow-100 text-yellow-800';
                case 'Vulnerable': return 'bg-orange-100 text-orange-800';
                case 'Endangered': return 'bg-red-100 text-red-800';
                case 'Critically Endangered': return 'bg-red-200 text-red-900';
                default: return 'bg-gray-100 text-gray-800';
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {activities.slice(0, 5).map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="p-2 rounded-full bg-blue-100">
                                <Icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                    {activity.title}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                    {activity.subtitle}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="secondary" className={getStatusColor(activity.status, activity.type)}>
                                        {activity.status}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                        {format(new Date(activity.date), 'MMM d, yyyy')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}