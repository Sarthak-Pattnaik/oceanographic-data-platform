import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function InteractiveSpeciesMap({ species, selectedSpecies, setSelectedSpecies, loading }) {
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        });
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Species Distribution Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-96 w-full" />
                </CardContent>
            </Card>
        );
    }

    // Mock coordinates for different ocean regions
    const getRegionCoordinates = (region) => {
        const coords = {
            'Atlantic': [25, -30],
            'Pacific': [0, -150],
            'Indian': [-20, 80],
            'Arctic': [80, 0],
            'Antarctic': [-70, 0]
        };
        return coords[region] || [0, 0];
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Least Concern': return '#10B981';
            case 'Near Threatened': return '#F59E0B';
            case 'Vulnerable': return '#EF4444';
            case 'Endangered': return '#DC2626';
            case 'Critically Endangered': return '#7F1D1D';
            default: return '#6B7280';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Interactive Species Distribution</CardTitle>
                <p className="text-sm text-gray-600">Click on markers to explore species details</p>
            </CardHeader>
            <CardContent>
                <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }} className="rounded-lg">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {species.map((spec) => {
                        const [lat, lng] = getRegionCoordinates(spec.ocean_region);
                        // Add some random offset to avoid overlapping markers
                        const offsetLat = lat + (Math.random() - 0.5) * 20;
                        const offsetLng = lng + (Math.random() - 0.5) * 40;
                        
                        return (
                            <CircleMarker
                                key={spec.id}
                                center={[offsetLat, offsetLng]}
                                radius={6 + (spec.size_cm / 50)}
                                color={getStatusColor(spec.conservation_status)}
                                fillColor={getStatusColor(spec.conservation_status)}
                                fillOpacity={0.7}
                                eventHandlers={{
                                    click: () => setSelectedSpecies(spec)
                                }}
                            >
                                <Popup>
                                    <div className="min-w-48">
                                        <h3 className="font-semibold mb-2">{spec.common_name}</h3>
                                        <p className="text-sm italic mb-2">{spec.scientific_name}</p>
                                        <Badge className={`mb-2 ${
                                            spec.conservation_status === 'Least Concern' ? 'bg-green-100 text-green-800' :
                                            spec.conservation_status === 'Near Threatened' ? 'bg-yellow-100 text-yellow-800' :
                                            spec.conservation_status === 'Vulnerable' ? 'bg-orange-100 text-orange-800' :
                                            spec.conservation_status === 'Endangered' ? 'bg-red-100 text-red-800' :
                                            'bg-red-200 text-red-900'
                                        }`}>
                                            {spec.conservation_status}
                                        </Badge>
                                        <div className="text-sm text-gray-600">
                                            <p>Size: {spec.size_cm}cm</p>
                                            <p>Diet: {spec.diet}</p>
                                            <p>Habitat: {spec.habitat_depth}</p>
                                            <p>Threat Level: {spec.threat_level}/10</p>
                                        </div>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        );
                    })}
                </MapContainer>
            </CardContent>
        </Card>
    );
}