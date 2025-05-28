import { supabase } from "../apiClient";
import type { Product, ProductId, Payment, Subscription } from "@/lib/types";
import { getBogotaDate, addMonthsToDate } from "@/lib/date-utils";

// Product types and functions
export type ProductCreateInput = Omit<Product, "id">;
export type ProductUpdateInput = Partial<Omit<Product, "id">>;

export async function createProduct(product: Product): Promise<Product | null> {
  const { data, error } = await supabase
    .from("product")
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error.message);
    return null;
  }

  return data as Product;
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data as Product[];
}

export async function getProductById(id: ProductId): Promise<Product | null> {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error.message);
    return null;
  }

  return data as Product;
}

export async function updateProduct(
  id: ProductId,
  updates: ProductUpdateInput
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("product")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating product with id ${id}:`, error.message);
    return null;
  }

  return data as Product;
}

export async function deleteProduct(id: ProductId): Promise<boolean> {
  const { error } = await supabase.from("product").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting product with id ${id}:`, error.message);
    return false;
  }

  return true;
}

// Payment types and functions
export type PaymentCreateInput = Omit<Payment, "id">;
export type PaymentUpdateInput = Partial<Omit<Payment, "id">>;

export async function getAllPayments(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from("payment")
    .select("*")
    .order("payment_date", { ascending: false });

  if (error) {
    console.error("Error fetching payments:", error.message);
    return [];
  }

  return data as Payment[];
}

export async function createPayment(
  data: PaymentCreateInput
): Promise<Payment | null> {
  const { data: created, error } = await supabase
    .from("payment")
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error("Error creating payment:", error.message);
    return null;
  }

  return created as Payment;
}

export async function getPaymentById(id: number): Promise<Payment | null> {
  const { data, error } = await supabase
    .from("payment")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching payment with ID ${id}:`, error.message);
    return null;
  }

  return data as Payment;
}

export async function updatePayment(
  id: number,
  updates: PaymentUpdateInput
): Promise<Payment | null> {
  const { data, error } = await supabase
    .from("payment")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating payment with ID ${id}:`, error.message);
    return null;
  }

  return data as Payment;
}

export async function deletePayment(id: number): Promise<boolean> {
  const { error } = await supabase.from("payment").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting payment with ID ${id}:`, error.message);
    return false;
  }

  return true;
}

// Alternative payment creation function (combining with createPayment.tsx)
export type PaymentInput = {
  subscription_id: number;
  amount: number;
  payment_date?: string; // ISO date, p.ej. "2025-05-17"
  status?: string; // p.ej. "PENDING", "COMPLETED"
  transaction_id?: string;
};

export async function createPaymentWithAuth(
  input: PaymentInput
): Promise<number> {
  // 1) Verifica que el usuario esté autenticado
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error("Usuario no autenticado");

  const finalPaymentDate = input.payment_date ?? getBogotaDate();
  console.log("DEBUG API: Creating payment with date:", finalPaymentDate);
  console.log("DEBUG API: Input payment_date:", input.payment_date);
  console.log("DEBUG API: getBogotaDate():", getBogotaDate());

  // 2) Inserta el registro
  const { data, error } = await supabase
    .from("payment")
    .insert({
      subscription_id: input.subscription_id,
      payment_date: finalPaymentDate,
      amount: input.amount,
      status: (input.status ?? "SUCCESS").toUpperCase(),
      transaction_id: input.transaction_id ?? "",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error inserting payment:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw new Error(error.message);
  }

  return data.id;
}

// Subscription types and functions
export type SubscriptionCreateInput = Omit<Subscription, "id" | "created_at">;
export type SubscriptionUpdateInput = Partial<
  Omit<Subscription, "id" | "user_id" | "created_at">
>;

export async function getAllSubscriptions(): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from("subscription")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all subscriptions:", error.message);
    return [];
  }

  return data as Subscription[];
}

export async function getRecentSubscriptions(
  limit = 10
): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from("subscription")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent subscriptions:", error.message);
    return [];
  }

  return data as Subscription[];
}

export async function getUserSubscriptions(userId: string) {
  try {
    const { data, error } = await supabase
      .from("subscription")
      .select(
        `
    *,
    payment (
      id,
      amount,
      payment_date,
      status,
      transaction_id
    )
  `
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching subscriptions:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error fetching subscriptions:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

export async function createSubscription(
  subscriptionData: SubscriptionCreateInput
) {
  try {
    // Calculate next payment due date if not provided
    let dataToInsert = { ...subscriptionData };
    if (
      !dataToInsert.next_payment_due_date &&
      dataToInsert.start_date &&
      dataToInsert.plan_type
    ) {
      const monthsToAdd =
        dataToInsert.plan_type === "Annual Subscription" ? 12 : 1;
      dataToInsert.next_payment_due_date = addMonthsToDate(
        dataToInsert.start_date,
        monthsToAdd
      );
    }

    const { data, error } = await supabase
      .from("subscription")
      .insert([dataToInsert])
      .select()
      .single();

    if (error) {
      console.error("Error creating subscription:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error creating subscription:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

export async function updateSubscription(
  id: number,
  updates: SubscriptionUpdateInput
) {
  try {
    const { data, error } = await supabase
      .from("subscription")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating subscription:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error updating subscription:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

export async function deleteSubscription(id: number) {
  try {
    const { error } = await supabase.from("subscription").delete().eq("id", id);

    if (error) {
      console.error("Error deleting subscription:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error deleting subscription:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

export async function getSubscriptionById(id: number) {
  try {
    const { data, error } = await supabase
      .from("subscription")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching subscription by ID:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error fetching subscription by ID:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

// Alternative subscription creation function (combining with createSubscription.tsx)
export type SubscriptionInput = {
  address_id: number;
  plan_type: string;
  product_type: string;
};

export async function createSubscriptionWithAuth(input: SubscriptionInput) {
  // 1) Obtener usuario
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error("Usuario no autenticado");

  const startDate = getBogotaDate();
  console.log("DEBUG API: Creating subscription with start_date:", startDate);
  console.log("DEBUG API: getBogotaDate():", getBogotaDate());

  // Calculate next payment due date based on plan type
  const monthsToAdd = input.plan_type === "Annual Subscription" ? 12 : 1;
  const nextPaymentDueDate = addMonthsToDate(startDate, monthsToAdd);
  console.log("DEBUG API: Next payment due date:", nextPaymentDueDate);

  // 2) Insertar en `subscription`
  const { data, error } = await supabase
    .from("subscription")
    .insert({
      user_id: user.id,
      address_id: input.address_id,
      start_date: startDate,
      next_payment_due_date: nextPaymentDueDate,
      status: "ACTIVE",
      plan_type: input.plan_type,
      product_type: input.product_type,
    })
    .select()
    .single();

  if (error) {
    console.error("Error inserting subscription:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw new Error(error.message);
  }

  return data.id;
}
