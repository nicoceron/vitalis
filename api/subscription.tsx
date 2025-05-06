import { supabase } from './apiClient';

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
