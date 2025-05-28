import { supabase } from "../apiClient";
import type { Product, ProductId, Payment, Subscription } from "@/lib/types";
import {
  getBogotaDate,
  addMonthsToDate,
  getCurrentDate,
} from "@/lib/date-utils";

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
  timezone?: string; // User's timezone
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

  // Use provided date or current date in user's timezone
  const finalPaymentDate = input.payment_date ?? getCurrentDate(input.timezone);
  console.log("DEBUG API: Creating payment with date:", finalPaymentDate);
  console.log("DEBUG API: Input payment_date:", input.payment_date);
  console.log("DEBUG API: User timezone:", input.timezone || "auto-detected");

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

export async function cancelSubscription(id: number) {
  try {
    // Verify user is authenticated
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();
    if (authErr) throw new Error(`Auth error: ${authErr.message}`);
    if (!user) throw new Error("Usuario no autenticado");

    console.log(
      `DEBUG: Attempting to cancel subscription ${id} for user ${user.id}`
    );

    // First, let's check if the subscription exists and what its current state is
    const { data: checkData, error: checkError } = await supabase
      .from("subscription")
      .select("*")
      .eq("id", id);

    console.log(
      `DEBUG: Subscription check - data:`,
      checkData,
      `error:`,
      checkError
    );

    if (checkError) {
      console.error("Error checking subscription:", checkError);
      return {
        success: false,
        error: `Failed to check subscription: ${checkError.message}`,
      };
    }

    if (!checkData || checkData.length === 0) {
      return { success: false, error: "Subscription not found" };
    }

    const subscription = checkData[0];
    console.log(`DEBUG: Found subscription:`, subscription);
    console.log(`DEBUG: Subscription status:`, subscription.status);
    console.log(`DEBUG: Subscription user_id:`, subscription.user_id);

    // Verify ownership
    if (subscription.user_id !== user.id) {
      return {
        success: false,
        error: "You can only cancel your own subscriptions",
      };
    }

    if (subscription.status === "canceled") {
      return { success: false, error: "Subscription is already canceled" };
    }

    // Try to update the subscription with explicit user_id and current status check
    console.log(`DEBUG: About to run UPDATE query with conditions:`);
    console.log(`DEBUG: - id = ${id}`);
    console.log(`DEBUG: - user_id = ${user.id}`);
    console.log(`DEBUG: - current status = ${subscription.status}`);
    console.log(
      `DEBUG: - status != "canceled" = ${subscription.status !== "canceled"}`
    );

    const { data, error, count } = await supabase
      .from("subscription")
      .update({ status: "canceled" })
      .eq("id", id)
      .eq("user_id", user.id)
      .neq("status", "canceled") // Only update if not already canceled
      .select();

    console.log(
      `DEBUG: Update attempt - data:`,
      data,
      `error:`,
      error,
      `count:`,
      count
    );

    if (error) {
      console.error("Error updating subscription:", error);

      // If the update failed due to RLS, let's try with explicit user_id match
      if (error.code === "PGRST116" || error.code === "PGRST301") {
        const { data: retryData, error: retryError } = await supabase
          .from("subscription")
          .update({ status: "canceled" })
          .eq("id", id)
          .eq("user_id", user.id)
          .select();

        console.log(
          `DEBUG: Retry update - data:`,
          retryData,
          `error:`,
          retryError
        );

        if (retryError) {
          return {
            success: false,
            error: `Unable to cancel subscription: ${retryError.message}. Please contact support.`,
          };
        }

        if (!retryData || retryData.length === 0) {
          return {
            success: false,
            error: "Subscription not found or permission denied",
          };
        }

        return { success: true, data: retryData[0] };
      }

      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      console.log(`DEBUG: No rows updated. Attempting alternative approach...`);

      // Try updating without the status filter to see if that's the issue
      const { data: altData, error: altError } = await supabase
        .from("subscription")
        .update({ status: "canceled" })
        .eq("id", id)
        .eq("user_id", user.id)
        .select();

      console.log(
        `DEBUG: Alternative update - data:`,
        altData,
        `error:`,
        altError
      );

      if (altError) {
        return {
          success: false,
          error: `Update failed: ${altError.message}. Please contact support.`,
        };
      }

      if (!altData || altData.length === 0) {
        // This indicates a serious RLS policy issue
        return {
          success: false,
          error:
            "Unable to update subscription due to database permissions. Please contact support.",
        };
      }

      return { success: true, data: altData[0] };
    }

    return { success: true, data: data[0] };
  } catch (err) {
    console.error("Unexpected error canceling subscription:", err);
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
  timezone?: string; // User's timezone
};

export async function createSubscriptionWithAuth(input: SubscriptionInput) {
  // 1) Obtener usuario
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) throw new Error(`Auth error: ${authErr.message}`);
  if (!user) throw new Error("Usuario no autenticado");

  // Use user's timezone if provided, otherwise detect from browser
  const startDate = getCurrentDate(input.timezone);
  console.log("DEBUG API: Creating subscription with start_date:", startDate);
  console.log("DEBUG API: User timezone:", input.timezone || "auto-detected");

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

export async function cancelSubscriptionViaAPI(id: number) {
  try {
    // Get current session token
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return { success: false, error: "Authentication required" };
    }

    const response = await fetch("/api/cancel-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ subscriptionId: id }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to cancel subscription",
      };
    }

    return result;
  } catch (error) {
    console.error("Error calling cancel subscription API:", error);
    return { success: false, error: "Network error occurred" };
  }
}
