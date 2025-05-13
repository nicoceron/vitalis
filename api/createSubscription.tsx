// api/createSubscription.ts
import { supabase } from './apiClient';

export type SubscriptionInput = {
  address_id:   number;
  plan_type:    string;
  product_type: string;
};

/**
 * Crea una suscripción para el usuario autenticado.
 */
export async function createSubscription(input: SubscriptionInput) {
  // 1) Obtener usuario
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error('Usuario no autenticado');

  // 2) Insertar en `subscription`
  const { data, error } = await supabase
    .from('subscription')
    .insert({
      user_id:      user.id,
      address_id:   input.address_id,
      start_date:   new Date().toISOString().slice(0, 10),
      status:       'ACTIVE',
      plan_type:    input.plan_type,
      product_type: input.product_type,
    })
    .select();

  if (error) {
    console.error('Error inserting subscription:', {
      message: error.message,
      details: error.details,
      hint:    error.hint,
      code:    error.code,
    });
    throw new Error(error.message);
  }

  return data;
}
