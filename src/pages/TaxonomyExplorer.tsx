import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, ChevronsRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

// Type definition for a taxonomy row
interface TaxonomyRow {
  species_id: string;
  scientific_name: string | null;
  common_name: string | null;
  family: string | null;
  genus: string | null;
}

// Function to fetch all taxonomy rows from Supabase
async function fetchTaxonomy(): Promise<TaxonomyRow[]> {
  const { data, error } = await supabase
    .from<string, TaxonomyRow>('taxonomy')
    .select('*');

  if (error) {
    console.error('Error fetching taxonomy:', error);
    return [];
  }

  return data || [];
}

// Helper function to group species by family
function groupByFamily(rows: TaxonomyRow[]) {
  const grouped: { id: string; name: string; species: string[] }[] = [];

  const map = new Map<string, { id: string; name: string; species: string[] }>();

  rows.forEach(row => {
    if (!row.family) return;
    if (!map.has(row.family)) {
      map.set(row.family, { id: row.family, name: row.family, species: [] });
    }
    map.get(row.family)!.species.push(row.scientific_name || row.common_name || 'Unknown');
  });

  return Array.from(map.values());
}

export default function TaxonomyExplorer() {
  const [taxonomy, setTaxonomy] = useState<{ id: string; name: string; species: string[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetchTaxonomy();
      const grouped = groupByFamily(data);
      setTaxonomy(grouped);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Taxonomy Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {loading ? (
            Array(2).fill(0).map((_, idx) => (
              <li key={idx} className="mb-2">
                <Skeleton className="h-6 w-32 mb-2" />
                <ul className="ml-6 space-y-2">
                  <li><Skeleton className="h-4 w-24" /></li>
                  <li><Skeleton className="h-4 w-24" /></li>
                </ul>
              </li>
            ))
          ) : (
            taxonomy.map((family) => (
              <li key={family.id}>
                <div className="flex items-center font-bold text-lg text-blue-800">
                  <ChevronsRight className="w-5 h-5 mr-2" />
                  {family.name}
                </div>
                <ul className="ml-8 mt-2 space-y-1">
                  {family.species.map((sp, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                      {sp}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
