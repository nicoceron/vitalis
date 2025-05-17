import { supabase } from './apiClient';

export type AddressInput = {
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
 * Inserta una dirección en `address` y devuelve el id generado.
 */
export async function createAddress(input: AddressInput): Promise<number> {
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error('Usuario no autenticado');

  const { data, error } = await supabase
    .from('address')
    .insert({
      street:     input.street,
      city:       input.city,
      state:      input.state,
      zip_code:   input.zip,
      country:    input.country,
      first_name: input.first_name,
      last_name:  input.last_name,
      phone:      input.phone,
      user_id:    user.id,
      is_default: true,
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
