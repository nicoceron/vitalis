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

const today = new Date();
const startDate = today.toISOString().slice(0,10);

// si es mensual, la fecha de next payment = today + 30 días
const nextPaymentDue =
  input.plan_type.toLowerCase() === 'monthly subscription'
    ? new Date(today.setDate(today.getDate() + 30))
        .toISOString()
        .slice(0,10)
    : null;


  // 2) Insertar en `subscription`
  const { data, error } = await supabase
    .from('subscription')
    .insert({
      user_id:      user.id,
      address_id:   input.address_id,
      start_date:   startDate,
      status:       'ACTIVE',
      plan_type:    input.plan_type,
      product_type: input.product_type,
      next_payment_due_date:  nextPaymentDue,
    })
    .select()
    .single();

  if (error) {
    console.error('Error inserting subscription:', {
      message: error.message,
      details: error.details,
      hint:    error.hint,
      code:    error.code,
    });
    throw new Error(error.message);
  }

  return data.id;
}
