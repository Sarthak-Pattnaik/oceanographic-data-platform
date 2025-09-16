import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, DollarSign, User } from 'lucide-react';
import { format } from 'date-fns';

export default function ProjectsList({ projects, loading }) {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Conservation Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <Skeleton className="h-2 w-full mb-2" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Planning': return 'bg-blue-100 text-blue-800';
            case 'Completed': return 'bg-purple-100 text-purple-800';
            case 'Paused': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Conservation Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg">{project.project_name}</h3>
                            <Badge className={getStatusColor(project.status)}>
                                {project.status}
                            </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                            {project.project_type} • {project.location}
                        </p>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span>Success Rate</span>
                                <span>{project.success_rate}%</span>
                            </div>
                            <Progress value={project.success_rate} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                <span>${(project.budget / 1000000).toFixed(1)}M</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{project.lead_researcher}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{format(new Date(project.start_date), 'MMM yyyy')}</span>
                            </div>
                            <div className="text-xs">
                                Target: {project.target_species?.slice(0, 2).join(', ')}
                                {project.target_species?.length > 2 && '...'}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}