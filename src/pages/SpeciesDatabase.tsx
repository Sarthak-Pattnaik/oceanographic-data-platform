import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SpeciesGrid from '../components/species/SpeciesGrid';

export default function SpeciesDatabase() {
    const [species, setSpecies] = useState([]);
    const [filteredSpecies, setFilteredSpecies] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        conservation_status: 'all',
        ocean_region: 'all',
        habitat_depth: 'all'
    });
    const [loading, setLoading] = useState(true);



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center py-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Marine Species Database
                </h1>
                <p className="text-gray-600 text-lg">
                    Comprehensive catalog of marine biodiversity with conservation data
                </p>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Search & Filter Species</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Search by common name or scientific name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                    <SpeciesFilters filters={filters} setFilters={setFilters} />
                </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600">
                    Showing {filteredSpecies.length} of {species.length} species
                </p>
                <div className="flex gap-2">
    
                </div>
            </div>

            {/* Species Grid */}
            <SpeciesGrid species={filteredSpecies} loading={loading} />
        </div>
    );
}