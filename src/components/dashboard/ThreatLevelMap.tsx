import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function ThreatLevelMap({ sites, species, loading }) {
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
                    <CardTitle>Global Threat Level Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-96 w-full" />
                </CardContent>
            </Card>
        );
    }

    // Calculate average threat level for each site based on species data
    const sitesWithThreatLevels = sites.map(site => {
        const siteSpecies = species.filter(s => s.ocean_region === site.site_name?.split(' ')[0]);
        const avgThreatLevel = siteSpecies.length > 0 
            ? siteSpecies.reduce((sum, s) => sum + (s.threat_level || 5), 0) / siteSpecies.length
            : 5;
        
        return {
            ...site,
            threatLevel: avgThreatLevel
        };
    });

    const getThreatColor = (level) => {
        if (level <= 3) return '#10B981'; // Green - Low threat
        if (level <= 6) return '#F59E0B'; // Yellow - Medium threat
        return '#EF4444'; // Red - High threat
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Global Threat Level Map</CardTitle>
            </CardHeader>
            <CardContent>
                <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }} className="rounded-lg">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {sitesWithThreatLevels.map((site) => (
                        <CircleMarker
                            key={site.id}
                            center={[site.latitude, site.longitude]}
                            radius={8 + site.threatLevel}
                            color={getThreatColor(site.threatLevel)}
                            fillColor={getThreatColor(site.threatLevel)}
                            fillOpacity={0.6}
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-semibold">{site.site_name}</h3>
                                    <p>Threat Level: {site.threatLevel.toFixed(1)}/10</p>
                                    <p>Depth: {site.depth_meters}m</p>
                                    <p>Biodiversity Index: {site.biodiversity_index}</p>
                                </div>
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
                
                {/* Legend */}
                <div className="flex justify-center mt-4 gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Low Threat (1-3)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Medium Threat (4-6)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-sm">High Threat (7-10)</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}