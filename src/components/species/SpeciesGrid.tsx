import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function SpeciesGrid({ species, loading }) {
    if (loading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-4">
                            <Skeleton className="h-48 w-full mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <Skeleton className="h-8 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Least Concern': return 'bg-green-100 text-green-800';
            case 'Near Threatened': return 'bg-yellow-100 text-yellow-800';
            case 'Vulnerable': return 'bg-orange-100 text-orange-800';
            case 'Endangered': return 'bg-red-100 text-red-800';
            case 'Critically Endangered': return 'bg-red-200 text-red-900';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getThreatColor = (level) => {
        if (level <= 3) return 'bg-green-500';
        if (level <= 6) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {species.map((spec) => (
                <Card key={spec.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-cyan-100">
                        {spec.image_url ? (
                            <img
                                src={spec.image_url}
                                alt={spec.common_name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-4xl">🐟</span>
                            </div>
                        )}
                        <div className="absolute top-2 right-2">
                            <div className={`w-3 h-3 rounded-full ${getThreatColor(spec.threat_level)}`} 
                                 title={`Threat Level: ${spec.threat_level}/10`}>
                            </div>
                        </div>
                    </div>
                    
                    <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-1 text-gray-900">
                            {spec.common_name}
                        </h3>
                        <p className="text-sm text-gray-600 italic mb-3">
                            {spec.scientific_name}
                        </p>
                        
                        <div className="space-y-2">
                            <Badge className={getStatusColor(spec.conservation_status)}>
                                {spec.conservation_status}
                            </Badge>
                            
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{spec.ocean_region} Ocean</span>
                                <span>{spec.size_cm}cm</span>
                            </div>
                            
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">Habitat:</span> {spec.habitat_depth}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}