import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Thermometer, Droplets } from 'lucide-react';
import { format } from 'date-fns';

export default function SitesList({ sites, loading }) {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Research Sites</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                            <Skeleton className="h-6 w-1/2 mb-2" />
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-blue-100 text-blue-800';
            case 'Protected': return 'bg-green-100 text-green-800';
            case 'Threatened': return 'bg-red-100 text-red-800';
            case 'Restored': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Research Sites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {sites.map((site) => (
                    <div key={site.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg">{site.site_name}</h3>
                            <Badge className={getStatusColor(site.site_status)}>
                                {site.site_status}
                            </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{site.depth_meters}m depth</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Thermometer className="w-4 h-4" />
                                <span>{site.water_temperature}°C</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4" />
                                <span>pH {site.ph_level}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>🌊</span>
                                <span>Index: {site.biodiversity_index}/100</span>
                            </div>
                        </div>
                        
                        {site.last_survey_date && (
                            <p className="text-xs text-gray-500 mt-3">
                                Last survey: {format(new Date(site.last_survey_date), 'MMM d, yyyy')}
                            </p>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}