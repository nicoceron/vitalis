import { supabase } from "./apiClient";
import type { Payment } from "@/lib/types";

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
