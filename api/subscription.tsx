import { supabase } from './apiClient';
import type { Subscription } from '@/lib/types';

export type SubscriptionCreateInput = Omit<Subscription, 'id' | 'created_at'>;

export type SubscriptionUpdateInput = Partial<
  Omit<Subscription, 'id' | 'user_id' | 'created_at'>
>;

export async function getUserSubscriptions(userId: string) {
  try {
    const { data, error } = await supabase
      .from('subscription')
      .select(
        `
        id,
        user_id,
        address_id,
        start_date,
        end_date,
        status,
        next_payment_due_date,
        created_at,
        plan_type,
        product_type
      `
      )
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching subscriptions:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error fetching subscriptions:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

export async function createSubscription(
  subscriptionData: SubscriptionCreateInput
) {
  try {
    const { data, error } = await supabase
      .from('subscription')
      .insert([subscriptionData])
      .select()
      .single();

    if (error) {
      console.error('Error creating subscription:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error creating subscription:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

export async function updateSubscription(
  id: number,
  updates: SubscriptionUpdateInput
) {
  try {
    const { data, error } = await supabase
      .from('subscription')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating subscription:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error updating subscription:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

export async function deleteSubscription(id: number) {
  try {
    const { error } = await supabase.from('subscription').delete().eq('id', id);

    if (error) {
      console.error('Error deleting subscription:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error deleting subscription:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

export async function getSubscriptionById(id: number) {
  try {
    const { data, error } = await supabase
      .from('subscription')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching subscription by ID:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error fetching subscription by ID:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}
