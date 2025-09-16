import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from 'lucide-react';

export default function SpeciesDetails({ species, allSpecies, setComparisonSpecies }) {
    if (!species) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Species Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-gray-500">
                        <p>Click on a species marker to view details</p>
                    </div>
                </CardContent>
            </Card>
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
        if (level <= 3) return 'text-green-600';
        if (level <= 6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const addToComparison = () => {
        setComparisonSpecies(prev => {
            if (prev.find(s => s.id === species.id)) return prev;
            return [...prev, species].slice(-3); // Keep only last 3
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>Species Details</CardTitle>
                    <Button 
                        size="sm" 
                        variant="outline"
                        onClick={addToComparison}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Compare
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Species Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg overflow-hidden">
                    {species.image_url ? (
                        <img
                            src={species.image_url}
                            alt={species.common_name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-6xl">🐟</span>
                        </div>
                    )}
                </div>

                {/* Basic Info */}
                <div>
                    <h3 className="text-2xl font-bold mb-2">{species.common_name}</h3>
                    <p className="text-lg text-gray-600 italic mb-3">{species.scientific_name}</p>
                    <Badge className={getStatusColor(species.conservation_status)}>
                        {species.conservation_status}
                    </Badge>
                </div>

                {/* Characteristics */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Ocean Region</p>
                        <p className="text-lg">{species.ocean_region}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Size</p>
                        <p className="text-lg">{species.size_cm} cm</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Diet</p>
                        <p className="text-lg">{species.diet}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Population Trend</p>
                        <p className={`text-lg ${
                            species.population_trend === 'Increasing' ? 'text-green-600' :
                            species.population_trend === 'Decreasing' ? 'text-red-600' :
                            'text-gray-600'
                        }`}>
                            {species.population_trend}
                        </p>
                    </div>
                </div>

                {/* Habitat */}
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Habitat Depth</p>
                    <p className="text-lg">{species.habitat_depth}</p>
                </div>

                {/* Threat Level */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-500">Threat Level</p>
                        <span className={`font-bold ${getThreatColor(species.threat_level)}`}>
                            {species.threat_level}/10
                        </span>
                    </div>
                    <Progress value={species.threat_level * 10} className="h-3" />
                    <p className="text-xs text-gray-500 mt-1">
                        {species.threat_level <= 3 ? 'Low risk from human activities' :
                         species.threat_level <= 6 ? 'Moderate risk from human activities' :
                         'High risk from human activities'}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}