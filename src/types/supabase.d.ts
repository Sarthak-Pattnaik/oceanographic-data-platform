export interface SpeciesPoint {
    id: number;
    latitude: number;
    longitude: number;
    temperature: number;
    salinity: number;
    abundance: number;
    // This property should be an array of taxonomy objects
    taxonomy: {
        species_id: string;
        scientific_name: string;
        common_name: string;
    } | null;
}