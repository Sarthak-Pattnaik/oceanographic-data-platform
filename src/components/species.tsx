"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // your existing supabase client

type Edna = {
    sequence_id: string;
    sequence: string;
};

type SpeciesEntry = {
    species_id: string;
    scientific_name: string;
    common_name: string;
    family: string;
    genus: string;
    otolith_image: string;
    edna_sequences: Edna[];
};

export default function SpeciesDatabasePage() {
    const [data, setData] = useState<SpeciesEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch taxonomy
                const { data: taxonomy, error: taxError } = await supabase
                    .from("taxonomy")
                    .select("species_id, scientific_name, common_name, family, genus");

                if (taxError) throw taxError;

                // 2. Fetch otoliths
                const { data: otoliths, error: otoError } = await supabase
                    .from("otoliths")
                    .select("species_id, image_url");

                if (otoError) throw otoError;

                // 3. Fetch eDNA sequences
                const { data: edna, error: ednaError } = await supabase
                    .from("edna_sequences")
                    .select("species_id, sequence_id, sequence");

                if (ednaError) throw ednaError;

                // 4. Combine data
                const combined: SpeciesEntry[] = taxonomy.map((tax) => ({
                    ...tax,
                    otolith_image: otoliths.find((o) => o.species_id === tax.species_id)?.image_url || "",
                    edna_sequences: edna
                        .filter((e) => e.species_id === tax.species_id)
                        .map((e) => ({ sequence_id: e.sequence_id, sequence: e.sequence })),
                }));
                setData(combined);
            } catch (err) {
                console.error("Error fetching species data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter(
        (entry) =>
            entry.scientific_name.toLowerCase().includes(search.toLowerCase()) ||
            entry.common_name.toLowerCase().includes(search.toLowerCase()) ||
            entry.family.toLowerCase().includes(search.toLowerCase()) ||
            entry.genus.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Species..."
                    className="border border-gray-400 px-3 py-2 w-full text-black rounded bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {/* Species Table */}
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-2 py-1 text-black">Species ID</th>
                        <th className="border px-2 py-1 text-black">Scientific Name</th>
                        <th className="border px-2 py-1 text-black">Common Name</th>
                        <th className="border px-2 py-1 text-black">Family</th>
                        <th className="border px-2 py-1 text-black">Otolith Image</th>
                        <th className="border px-2 py-1 text-black">eDNA Sequences</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((entry) => (
                        <tr key={entry.species_id}>
                            <td className="border px-2 py-1 text-black">{entry.species_id}</td>
                            <td className="border px-2 py-1 text-black">{entry.scientific_name}</td>
                            <td className="border px-2 py-1 text-black">{entry.common_name}</td>
                            <td className="border px-2 py-1 text-black">{entry.family}</td>
                            <td className="border px-2 py-1">
                                {entry.otolith_image ? (
                                    <img
                                        src={entry.otolith_image}
                                        alt="otolith"
                                        className="w-20 h-20 object-contain"
                                    />
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td className="border px-2 py-1 text-black">
                                {entry.edna_sequences.length > 0 ? (
                                    <ul className="list-disc pl-4">
                                        {entry.edna_sequences.map((seq, idx) => (
                                            <li key={idx}>
                                                <b>{seq.sequence_id}:</b> {seq.sequence}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    "N/A"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
