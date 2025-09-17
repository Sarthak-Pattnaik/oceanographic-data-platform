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

  const { species_id } = req.query;

  const { data, error } = await supabase
    .from('edna_sequences')
    .select('*')
    .eq('species_id', species_id)
    .single();
    

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data);
}
