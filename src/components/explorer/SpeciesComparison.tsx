import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

export default function SpeciesComparison({ comparisonSpecies }) {
    if (comparisonSpecies.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Species Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-gray-500">
                        <p>Add species to comparison by clicking "Compare" button</p>
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Species Comparison ({comparisonSpecies.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {comparisonSpecies.map((species) => (
                        <div key={species.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-semibold">{species.common_name}</h4>
                                    <p className="text-sm text-gray-600 italic">{species.scientific_name}</p>
                                </div>
                                <Button size="sm" variant="ghost">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            
                            <Badge className={`${getStatusColor(species.conservation_status)} mb-3`}>
                                {species.conservation_status}
                            </Badge>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-gray-500">Size:</span>
                                    <span className="ml-1 font-medium">{species.size_cm}cm</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Threat:</span>
                                    <span className="ml-1 font-medium">{species.threat_level}/10</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Region:</span>
                                    <span className="ml-1 font-medium">{species.ocean_region}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Trend:</span>
                                    <span className={`ml-1 font-medium ${
                                        species.population_trend === 'Increasing' ? 'text-green-600' :
                                        species.population_trend === 'Decreasing' ? 'text-red-600' :
                                        'text-gray-600'
                                    }`}>
                                        {species.population_trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {comparisonSpecies.length > 1 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-semibold mb-2">Quick Comparison</h5>
                        <div className="text-sm space-y-1">
                            <p>
                                <span className="text-gray-600">Size Range:</span>{' '}
                                {Math.min(...comparisonSpecies.map(s => s.size_cm))}cm - {Math.max(...comparisonSpecies.map(s => s.size_cm))}cm
                            </p>
                            <p>
                                <span className="text-gray-600">Threat Range:</span>{' '}
                                {Math.min(...comparisonSpecies.map(s => s.threat_level))}/10 - {Math.max(...comparisonSpecies.map(s => s.threat_level))}/10
                            </p>
                            <p>
                                <span className="text-gray-600">Most Threatened:</span>{' '}
                                {comparisonSpecies.reduce((max, s) => s.threat_level > max.threat_level ? s : max).common_name}
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}