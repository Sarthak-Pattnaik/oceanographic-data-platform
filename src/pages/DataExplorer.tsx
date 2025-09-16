import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DataExplorer() {
    const [speciesData, setSpeciesData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


    return (
        <Card className="rounded-2xl shadow-lg">
            <CardHeader>
                <CardTitle>Data Explorer</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Search species, family, or region..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-4"
                />
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableHead>Name</TableHead>
                                <TableHead>Family</TableHead>
                                <TableHead>Region</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array(3).fill(0).map((_, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                null
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}