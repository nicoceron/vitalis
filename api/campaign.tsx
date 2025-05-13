import { supabase } from './apiClient';
import type { Campaign } from '@/lib/types';

export type CampaignCreateInput = Omit<Campaign, 'id'>;
export type CampaignUpdateInput = Partial<Omit<Campaign, 'id'>>;

export async function createCampaign(
  campaign: CampaignCreateInput
): Promise<Campaign | null> {
  const { data, error } = await supabase
    .from('campaign')
    .insert([campaign])
    .select()
    .single();

  if (error) {
    console.error('Error creating campaign:', error.message);
    return null;
  }

  return data as Campaign;
}

export async function getAllCampaigns(): Promise<Campaign[]> {
  const { data, error } = await supabase
    .from('campaign')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching campaigns:', error.message);
    return [];
  }

  return data as Campaign[];
}

export async function getCampaignById(id: number): Promise<Campaign | null> {
  const { data, error } = await supabase
    .from('campaign')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching campaign with id ${id}:`, error.message);
    return null;
  }

  return data as Campaign;
}

export async function updateCampaign(
  id: number,
  updates: CampaignUpdateInput
): Promise<Campaign | null> {
  const { data, error } = await supabase
    .from('campaign')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating campaign with id ${id}:`, error.message);
    return null;
  }

  return data as Campaign;
}

export async function deleteCampaign(id: number): Promise<boolean> {
  const { error } = await supabase.from('campaign').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting campaign with id ${id}:`, error.message);
    return false;
  }

  return true;
}
