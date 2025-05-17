import { supabase } from './apiClient';

export type PaymentInput = {
  subscription_id: number;
  amount:          number;
  payment_date?:   string;  // ISO date, p.ej. "2025-05-17"
  status?:         string;  // p.ej. "PENDING", "COMPLETED"
  transaction_id?: string;
};

/**
 * Inserta un pago en la tabla `payment` y devuelve el id generado.
 */
export async function createPayment(input: PaymentInput): Promise<number> {
  // 1) Verifica que el usuario esté autenticado
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error('Usuario no autenticado');

  // 2) Inserta el registro
  const { data, error } = await supabase
    .from('payment')
    .insert({
      subscription_id: input.subscription_id,
      payment_date:    input.payment_date ?? new Date().toISOString().slice(0, 10),
      amount:          input.amount,
      status:          (input.status ?? 'SUCCESS').toUpperCase(),
      transaction_id:  input.transaction_id ?? '',
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error inserting payment:', {
      message: error.message,
      details: error.details,
      hint:    error.hint,
      code:    error.code,
    });
    throw new Error(error.message);
  }

  return data.id;
}
