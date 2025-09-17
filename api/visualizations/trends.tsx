import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { minLat, maxLat, minLng, maxLng } = req.query;

    // Validate query parameters
    if (!minLat || !maxLat || !minLng || !maxLng) {
      return res.status(400).json({ error: 'Missing query parameters' });
    }

    const minLatitude = parseFloat(minLat as string);
    const maxLatitude = parseFloat(maxLat as string);
    const minLongitude = parseFloat(minLng as string);
    const maxLongitude = parseFloat(maxLng as string);

    if (
      isNaN(minLatitude) || isNaN(maxLatitude) ||
      isNaN(minLongitude) || isNaN(maxLongitude)
    ) {
      return res.status(400).json({ error: 'Invalid latitude/longitude values' });
    }

    const { data, error } = await supabase
      .from('species_distribution')
      .select('*')
      .gte('latitude', minLatitude)
      .lte('latitude', maxLatitude)
      .gte('longitude', minLongitude)
      .lte('longitude', maxLongitude);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
