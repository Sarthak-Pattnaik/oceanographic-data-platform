"use client";

import { useEffect, useState } from "react";
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
    BarChart, Bar
} from "recharts";



// Plotly for heatmap
import Plot from "react-plotly.js";
import type { SpeciesPoint as SpeciesDistribution } from "@/types/supabase";
import { supabase } from "../lib/supabaseClient";
import { ResponsiveContainer } from "recharts";

type AggregatedSpecies = {
    species_id: string;
    species_name: string;
    abundance: number;
};

export default function VisualizationsPage() {
    const [data, setData] = useState<SpeciesDistribution[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("species_distribution")
                .select(`
          id,
          latitude,
          longitude,
          temperature,
          salinity,
          abundance,
          taxonomy (
            species_id,
            scientific_name,
            common_name
          )
        `);

            if (error) {
                console.error("Error fetching species distribution:", error);
                return;
            }

            if (data) {
                // Let TS infer the shape by mapping into SpeciesPoint
                const mapped: SpeciesDistribution[] = data.map((row: any) => ({
                    id: row.id,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    temperature: row.temperature,
                    salinity: row.salinity,
                    abundance: row.abundance,
                    species_id: row.taxonomy?.species_id,
                    taxonomy: row.taxonomy
                        ? {
                            species_id: row.taxonomy.species_id,
                            scientific_name: row.taxonomy.scientific_name,
                            common_name: row.taxonomy.common_name,
                        }
                        : null,
                }));

                setData(mapped);
            }
        };

        fetchData();
    }, []);


    const [latRange, setLatRange] = useState({ min: -90, max: 90 });
    const [lonRange, setLonRange] = useState({ min: -180, max: 180 });



    // Filter data based on region
    const filteredData = data.filter(
        (point) =>
            point.latitude >= latRange.min &&
            point.latitude <= latRange.max &&
            point.longitude >= lonRange.min &&
            point.longitude <= lonRange.max
    );

    // Prepare Heatmap data
    const heatmapData = {
        x: filteredData.map(d => d.longitude),
        y: filteredData.map(d => d.latitude),
        z: filteredData.map(d => d.abundance),
        type: "heatmap" as const,
        colorscale: "Viridis"
    };

    // First, aggregate the data by species_id
    const aggregatedData: AggregatedSpecies[] = Object.values(
        filteredData.reduce((acc: Record<string, AggregatedSpecies>, curr) => {
            const id = curr.taxonomy?.species_id;
            if (!id) return acc; // skip if missing id

            if (!acc[id]) {
                acc[id] = {
                    species_id: id,
                    species_name: curr.taxonomy?.common_name ?? "Unknown",
                    abundance: 0,
                };
            }

            acc[id].abundance += curr.abundance; // sum abundance
            return acc;
        }, {} as Record<string, AggregatedSpecies>)
    );



    return (
        <div className="p-6 bg-white">
            {/* Filter Form */}
            <div className="mb-8 p-4 border rounded bg-gray-50">
                <h2 className="text-lg font-semibold mb-2 text-black">Filter by Region</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Min Latitude</label>
                        <input
                            type="number"
                            value={latRange.min}
                            onChange={(e) => setLatRange({ ...latRange, min: parseFloat(e.target.value) })}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Latitude</label>
                        <input
                            type="number"
                            value={latRange.max}
                            onChange={(e) => setLatRange({ ...latRange, max: parseFloat(e.target.value) })}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Min Longitude</label>
                        <input
                            type="number"
                            value={lonRange.min}
                            onChange={(e) => setLonRange({ ...lonRange, min: parseFloat(e.target.value) })}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Longitude</label>
                        <input
                            type="number"
                            value={lonRange.max}
                            onChange={(e) => setLonRange({ ...lonRange, max: parseFloat(e.target.value) })}
                            className="w-full border rounded p-2"
                        />
                    </div>
                </div>
            </div>

            {/* Grid of charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Temperature vs Salinity Scatter Plot */}
                <div>
                    <h2 className="text-xl text-black font-semibold mb-2">Temperature vs Salinity</h2>
                    <ScatterChart width={600} height={400}>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="temperature" name="Temperature (°C)" domain={["dataMin - 2", "dataMax + 2"]} />
                        <YAxis type="number" dataKey="salinity" name="Salinity (PSU)" domain={["dataMin - 2", "dataMax + 2"]} />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter name="Samples" data={filteredData} fill="#8884d8" />
                    </ScatterChart>
                </div>

                {/* Species Abundance Bar Chart */}
                <div>
                    <h2 className="text-xl text-black font-semibold mb-2">Species Abundance</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={aggregatedData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="species_name" interval={0} angle={-45} textAnchor="end" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="abundance" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Biodiversity Heatmap */}
                <div>
                    <h2 className="text-xl text-black font-semibold mb-2">Biodiversity Heatmap</h2>
                    <Plot
                        data={[heatmapData]} // you should filter heatmapData by lat/long too if it's built from `data`
                        layout={{
                            width: 600,
                            height: 400,
                            title: "Abundance Heatmap",
                            xaxis: { title: "Longitude" },
                            yaxis: { title: "Latitude" },
                        }}
                    />
                </div>

                {/* Spatial Distribution Map */}
                <div className="w-full h-96">
                    <h2 className="text-xl text-black font-semibold mb-2">Spatial Distribution</h2>
                    <Plot
                        data={[
                            {
                                type: "scattergeo",
                                mode: "markers",
                                lat: filteredData.map(d => d.latitude),
                                lon: filteredData.map(d => d.longitude),
                                marker: { size: 8, color: "blue" },
                                text: filteredData.map(d => d.taxonomy?.common_name),
                            }
                        ]}
                        layout={{
                            geo: {
                                scope: "world",
                                projection: { type: "natural earth" },
                                showland: true,
                                landcolor: "#f0f0f0",
                                subunitcolor: "#d0d0d0",
                            },
                            width: 600,
                            height: 400,
                            margin: { t: 0, b: 0, l: 0, r: 0 }
                        }}
                    />
                </div>

            </div>
        </div>
    );

}
