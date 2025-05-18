import { supabase } from "./apiClient";
import type { UserAccount } from "@/lib/types";

export type UserAccountCreateInput = Omit<
  UserAccount,
  "id" | "created_at" | "last_sign_in_at"
>;

export type UserAccountUpdateInput = Partial<
  Omit<UserAccount, "id" | "created_at" | "last_sign_in_at">
>;

export async function getAllUserAccounts(): Promise<UserAccount[]> {
  const { data, error } = await supabase
    .from("user_account")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all user accounts:", error.message);
    return [];
  }

  return data as UserAccount[];
}

export async function getRecentUsers(limit = 10): Promise<UserAccount[]> {
  const { data, error } = await supabase
    .from("user_account")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent users:", error.message);
    return [];
  }

  return data as UserAccount[];
}

export async function getUserAccountById(
  id: string
): Promise<UserAccount | null> {
  const { data, error } = await supabase
    .from("user_account")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching user account with id ${id}:`, error.message);
    return null;
  }

  return data as UserAccount;
}

export async function getUserAccountByEmail(
  email: string
): Promise<UserAccount | null> {
  const { data, error } = await supabase
    .from("user_account")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error(
      `Error fetching user account with email ${email}:`,
      error.message
    );
    return null;
  }

  return data as UserAccount;
}

export async function createUserAccount(
  userData: UserAccountCreateInput
): Promise<UserAccount | null> {
  const { data, error } = await supabase
    .from("user_account")
    .insert([userData])
    .select()
    .single();

  if (error) {
    console.error("Error creating user account:", error.message);
    return null;
  }

  return data as UserAccount;
}

export async function updateUserAccount(
  id: string,
  updates: UserAccountUpdateInput
): Promise<UserAccount | null> {
  const { data, error } = await supabase
    .from("user_account")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user account with id ${id}:`, error.message);
    return null;
  }

  return data as UserAccount;
}

export async function deleteUserAccount(id: string): Promise<boolean> {
  const { error } = await supabase.from("user_account").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting user account with id ${id}:`, error.message);
    return false;
  }

  return true;
}
