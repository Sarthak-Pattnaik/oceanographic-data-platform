import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SpeciesFilters({ filters, setFilters }) {
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="grid md:grid-cols-3 gap-4">
            <Select 
                value={filters.conservation_status} 
                onValueChange={(value) => handleFilterChange('conservation_status', value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Conservation Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Least Concern">Least Concern</SelectItem>
                    <SelectItem value="Near Threatened">Near Threatened</SelectItem>
                    <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                    <SelectItem value="Endangered">Endangered</SelectItem>
                    <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                </SelectContent>
            </Select>

            <Select 
                value={filters.ocean_region} 
                onValueChange={(value) => handleFilterChange('ocean_region', value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Ocean Region" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Atlantic">Atlantic</SelectItem>
                    <SelectItem value="Pacific">Pacific</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="Arctic">Arctic</SelectItem>
                    <SelectItem value="Antarctic">Antarctic</SelectItem>
                </SelectContent>
            </Select>

            <Select 
                value={filters.habitat_depth} 
                onValueChange={(value) => handleFilterChange('habitat_depth', value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Habitat Depth" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Depths</SelectItem>
                    <SelectItem value="Surface (0-200m)">Surface (0-200m)</SelectItem>
                    <SelectItem value="Mesopelagic (200-1000m)">Mesopelagic (200-1000m)</SelectItem>
                    <SelectItem value="Bathypelagic (1000-4000m)">Bathypelagic (1000-4000m)</SelectItem>
                    <SelectItem value="Abyssopelagic (4000m+)">Abyssopelagic (4000m+)</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}