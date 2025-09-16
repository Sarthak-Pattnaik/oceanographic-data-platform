import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function ProjectTimeline({ projects, loading }) {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        );
    }

    // Sort projects by start date
    const sortedProjects = [...projects].sort((a, b) => 
        new Date(a.start_date) - new Date(b.start_date)
    );

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
                <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sortedProjects.map((project, index) => (
                        <div key={project.id} className="relative">
                            {/* Timeline line */}
                            {index < sortedProjects.length - 1 && (
                                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                            )}
                            
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-900 truncate">
                                            {project.project_name}
                                        </h4>
                                        <Badge className={getStatusColor(project.status)}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 mb-2">
                                        {project.project_type} • {project.location}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>
                                                {format(new Date(project.start_date), 'MMM d, yyyy')}
                                                {project.end_date && (
                                                    <> - {format(new Date(project.end_date), 'MMM d, yyyy')}</>
                                                )}
                                            </span>
                                        </div>
                                        <span>{project.success_rate}% success</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}