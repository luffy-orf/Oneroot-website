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

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching region with id ${id}:`, error);
    return { data: null, error };
  }
};