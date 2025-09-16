import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function SitesMap({ sites, loading }) {
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
                    <CardTitle>Research Sites Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-96 w-full" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Research Sites Map</CardTitle>
            </CardHeader>
            <CardContent>
                <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }} className="rounded-lg">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {sites.map((site) => (
                        <Marker key={site.id} position={[site.latitude, site.longitude]}>
                            <Popup>
                                <div>
                                    <h3 className="font-semibold">{site.site_name}</h3>
                                    <p>Status: {site.site_status}</p>
                                    <p>Depth: {site.depth_meters}m</p>
                                    <p>Temperature: {site.water_temperature}°C</p>
                                    <p>Biodiversity Index: {site.biodiversity_index}/100</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </CardContent>
        </Card>
    );
}