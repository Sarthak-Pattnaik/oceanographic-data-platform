import React, { useState, useEffect } from 'react';

import InteractiveSpeciesMap from '../components/explorer/InteractiveSpeciesMap';
import SpeciesDetails from '../components/explorer/SpeciesDetails';
import SpeciesComparison from '../components/explorer/SpeciesComparison';

export default function SpeciesExplorer() {
    const [species, setSpecies] = useState([]);
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [comparisonSpecies, setComparisonSpecies] = useState([]);
    const [loading, setLoading] = useState(true);

    

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center py-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Interactive Species Explorer
                </h1>
                <p className="text-gray-600 text-lg">
                    Explore marine species distribution, behavior, and conservation status
                </p>
            </div>

            {/* Interactive Map */}
            <InteractiveSpeciesMap 
                species={species} 
                selectedSpecies={selectedSpecies}
                setSelectedSpecies={setSelectedSpecies}
                loading={loading} 
            />

            {/* Species Details and Comparison */}
            <div className="grid lg:grid-cols-2 gap-6">
                <SpeciesDetails 
                    species={selectedSpecies} 
                    allSpecies={species}
                    setComparisonSpecies={setComparisonSpecies}
                />
                <SpeciesComparison comparisonSpecies={comparisonSpecies} />
            </div>
        </div>
    );
}