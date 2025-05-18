import { supabase } from "../apiClient";

// Address types and functions
export type AddressInput = {
  first_name: string;
  last_name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
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
  if (!user) throw new Error("Usuario no autenticado");

  const { data, error } = await supabase
    .from("address")
    .insert({
      street: input.street,
      city: input.city,
      state: input.state,
      zip_code: input.zip,
      country: input.country,
      first_name: input.first_name,
      last_name: input.last_name,
      phone: input.phone,
      user_id: user.id,
      is_default: true,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error saving address:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw new Error(error.message);
  }

  return data.id;
}

// Shipping types and functions
export type ShippingInput = {
  subscription_id?: number;
  address_id: number;
  shipment_date?: string;
  tracking_number?: string;
};

export async function createShipping(input: ShippingInput): Promise<number> {
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error("Usuario no autenticado");

  // Debug: qué payload paso realmente
  console.log("→ createShipping payload:", input);

  const resp = await supabase
    .from("shipping")
    .insert({
      subscription_id: input.subscription_id ?? null,
      address_id: input.address_id,
      shipment_date:
        input.shipment_date ?? new Date().toISOString().slice(0, 10),
      delivery_status: "PENDING",
      tracking_number: input.tracking_number ?? null,
    })
    .select("id")
    .single();

  const { data, error } = resp;

  if (error) {
    // Esto extrae todas las props "ocultas" del error
    console.error("Supabase createShipping error:", { ...error });
    // Si quieres verlas aún más en detalle:
    console.dir(error, { depth: null, colors: true });

    // Lanza un Error con mensaje y código para que tu catch lo reciba
    throw new Error(`Insert failed: ${error.message} (code: ${error.code})`);
  }

  if (!data) {
    throw new Error("No se devolvió data al crear el shipping");
  }

  return data.id;
}
