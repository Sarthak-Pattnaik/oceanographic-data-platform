import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../components/ui/badge";
import { Fish, MapPin, Shield, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

import OverviewStats from '../components/dashboard/OverviewStats';
import ConservationChart from '../components/dashboard/ConservationChart';
import ThreatLevelMap from '../components/dashboard/ThreatLevelMap';
import RecentActivity from '../components/dashboard/RecentActivity';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalSpecies: 0,
        researchSites: 0,
        activeProjects: 0,
        threatenedSpecies: 0
    });
    const [species, setSpecies] = useState([]);
    const [sites, setSites] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Marine Biodiversity Dashboard
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Monitor ocean health, track species conservation, and manage research initiatives
                </p>
            </div>

            {/* Overview Stats */}
            <OverviewStats stats={stats} loading={loading} />

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Conservation Status Chart */}
                <div className="lg:col-span-2">
                    <ConservationChart species={species} loading={loading} />
                </div>

                {/* Recent Activity */}
                <div>
                    <RecentActivity projects={projects} species={species} loading={loading} />
                </div>
            </div>

            {/* Threat Level Map */}
            <ThreatLevelMap sites={sites} species={species} loading={loading} />

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <Fish className="w-12 h-12 mx-auto mb-3 opacity-90" />
                            <h3 className="font-semibold mb-2">Add New Species</h3>
                            <p className="text-blue-100 text-sm">Document newly discovered marine life</p>
                        </div>
                        <div>
                            <MapPin className="w-12 h-12 mx-auto mb-3 opacity-90" />
                            <h3 className="font-semibold mb-2">Create Research Site</h3>
                            <p className="text-blue-100 text-sm">Establish new monitoring locations</p>
                        </div>
                        <div>
                            <Shield className="w-12 h-12 mx-auto mb-3 opacity-90" />
                            <h3 className="font-semibold mb-2">Launch Conservation Project</h3>
                            <p className="text-blue-100 text-sm">Start new protection initiatives</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}