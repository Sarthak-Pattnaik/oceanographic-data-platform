import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapViewer({ locations }) {
    useEffect(() => {
        // Fix for default marker icon issue with webpack
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        });
    }, []);

    return (
        <MapContainer center={[20, 80]} zoom={3} style={{ height: "300px", width: "100%" }} className="rounded-lg">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc) => (
                <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                    <Popup>
                        <b>{loc.species}</b> <br /> Abundance: {loc.abundance}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}