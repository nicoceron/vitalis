import { supabase } from "../apiClient";
import type { UserAccount } from "@/lib/types";

export type UserAccountCreateInput = Omit<
  UserAccount,
  "id" | "created_at" | "last_sign_in_at"
>;

export type UserAccountUpdateInput = Partial<
  Omit<UserAccount, "id" | "created_at" | "last_sign_in_at">
>;

// Auth functions
export async function registerUser(
  email: string,
  password: string,
  fullName: string
) {
  try {
    // Use the Supabase client to sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Store the full name in user metadata
        },
      },
    });

    if (error) {
      console.error("Error during registration:", error.message);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: "Registration successful. Please verify your email.",
    };
  } catch (err) {
    console.error("Unexpected error during registration:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const { data: authData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      console.error("Error during login:", loginError.message);
      return { success: false, error: loginError.message };
    }

    const user = authData.user;
    const userId = user.id;

    console.log("Logging in with Supabase user ID:", userId);

    // Step 1: Check if user_account exists
    const { data: userAccount, error: fetchError } = await supabase
      .from("user_account")
      .select("*")
      .eq("id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking user_account:", fetchError.message);
      return { success: false, error: fetchError.message };
    }

    // Step 2: If not found, insert a new row with full metadata
    if (!userAccount) {
      const { data: newUserAccount, error: insertError } = await supabase
        .from("user_account")
        .insert([
          {
            id: userId,
            full_name: user.user_metadata?.full_name ?? "",
            email: user.email,
            created_at: user.created_at,
            last_sign_in_at: user.last_sign_in_at,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error(
          "Error inserting into user_account:",
          insertError.message
        );
        return { success: false, error: insertError.message };
      }

      return {
        success: true,
        data: {
          authUser: user,
          userAccount: newUserAccount,
        },
      };
    }

    // Step 3: If user_account exists, return it
    return {
      success: true,
      data: {
        authUser: user,
        userAccount,
      },
    };
  } catch (err) {
    console.error("Unexpected error during login:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

// User account functions
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
