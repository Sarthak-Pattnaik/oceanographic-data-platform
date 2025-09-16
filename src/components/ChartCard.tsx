import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ChartCard({ data }) {
    return (
        <Card className="rounded-2xl shadow-lg">
            <CardHeader>
                <CardTitle>Salinity vs. Fish Abundance</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="location" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" name="Salinity" dataKey="salinity" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" name="Fish Abundance" dataKey="fish_abundance" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}