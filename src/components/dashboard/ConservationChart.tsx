import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

export default function ConservationChart({ species, loading }) {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Conservation Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-80 w-full" />
                </CardContent>
            </Card>
        );
    }

    const statusCounts = species.reduce((acc, s) => {
        acc[s.conservation_status] = (acc[s.conservation_status] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(statusCounts).map(([status, count]) => ({
        status: status.replace(' ', '\n'),
        count,
        fullStatus: status
    }));

    const COLORS = {
        'Least Concern': '#10B981',
        'Near Threatened': '#F59E0B',
        'Vulnerable': '#EF4444',
        'Endangered': '#DC2626',
        'Critically Endangered': '#7F1D1D',
        'Extinct': '#374151'
    };

    const pieData = chartData.map(item => ({
        ...item,
        color: COLORS[item.fullStatus] || '#6B7280'
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Conservation Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Bar Chart */}
                    <div>
                        <h3 className="font-semibold mb-4">Species Count by Status</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="status" fontSize={12} />
                                <YAxis />
                                <Tooltip />
                                <Bar 
                                    dataKey="count" 
                                    fill={(entry) => COLORS[entry.fullStatus] || '#6B7280'}
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div>
                        <h3 className="font-semibold mb-4">Threat Level Distribution</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="count"
                                    label={(entry) => `${entry.count}`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}