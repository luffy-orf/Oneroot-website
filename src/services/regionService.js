import { supabase } from '../config/supabase';

export const fetchAllRegions = async () => {
  try {
    const { data, error } = await supabase
      .from('regions')
      .select(`
        *,
        media:region_media (
          id,
          url,
          type,
          created_at
        )
      `)
      .order('name');

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching regions:', error);
    return { data: null, error };
  }
};

export const fetchRegionById = async (id) => {
  try {
    console.log(`Fetching region with id: ${id}`);
    
    if (!id) {
      console.error('Invalid region ID provided:', id);
      return { data: null, error: new Error('Invalid region ID') };
    }
    
    const { data, error } = await supabase
      .from('regions')
      .select(`
        *,
        media:region_media (
          id,
          url,
          type,
          created_at
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Supabase error fetching region with id ${id}:`, error);
      return { data: null, error };
    }
    
    if (!data) {
      console.warn(`No data found for region with id ${id}`);
      return { data: null, error: new Error('Region not found') };
    }
    
    console.log(`Successfully fetched region: ${data.name}`);
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching region with id ${id}:`, error);
    return { data: null, error };
  }
};