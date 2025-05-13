// api/saveShippingInfo.ts
import { supabase } from './apiClient';

export type ShippingInfoInput = {
  first_name: string;
  last_name:  string;
  email:      string;
  street:     string;
  city:       string;
  state:      string;
  zip:        string;
  country:    string;
  phone:      string;
};

/**
 * Inserta una fila en `address` y devuelve el id generado.
 */
export async function saveShippingInfo(input: ShippingInfoInput): Promise<number> {
  // 1) Obtener usuario autenticado para el user_id
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error('Usuario no autenticado');

  // 2) Insertar en la tabla `address`
  const { data, error } = await supabase
    .from('address')
    .insert({
      street:     input.street,
      city:       input.city,
      state:      input.state,
      zip_code:   input.zip,             // coincide con tu columna `zip_code`
      country:    input.country,
      first_name: input.first_name,
      last_name:  input.last_name,
      phone:      input.phone,
      user_id:    user.id,
      is_default: true,                  // marca esta dirección como por defecto
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error saving address:', {
      message: error.message,
      details: error.details,
      hint:    error.hint,
      code:    error.code,
    });
    throw new Error(error.message);
  }

  return data.id;
}
