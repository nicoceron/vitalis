// api/createShipping.ts
import { supabase } from './apiClient';

export type ShippingInput = {
  subscription_id?: number;
  address_id:      number;
  shipment_date?:  string;
  tracking_number?: string;
};

export async function createShipping(input: ShippingInput): Promise<number> {
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error('Usuario no autenticado');

  // Debug: qué payload paso realmente
  console.log('→ createShipping payload:', input);

  const resp = await supabase
    .from('shipping')
    .insert({
      subscription_id: input.subscription_id ?? null,
      address_id:      input.address_id,
      shipment_date:   input.shipment_date ?? new Date().toISOString().slice(0, 10),
      delivery_status: 'PENDING',
      tracking_number: input.tracking_number ?? null,
    })
    .select('id')
    .single();

  const { data, error } = resp;

  if (error) {
    // Esto extrae todas las props “ocultas” del error
    console.error('Supabase createShipping error:', { ...error });
    // Si quieres verlas aún más en detalle:
    console.dir(error, { depth: null, colors: true });

    // Lanza un Error con mensaje y código para que tu catch lo reciba
    throw new Error(`Insert failed: ${error.message} (code: ${error.code})`);
  }

  if (!data) {
    throw new Error('No se devolvió data al crear el shipping');
  }

  return data.id;
}
