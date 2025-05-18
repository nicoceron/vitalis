import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and Key must be provided in environment variables."
  );
}

// Creating custom type that includes the auth methods we need
export type ExtendedSupabaseClient = SupabaseClient & {
  auth: SupabaseClient["auth"] & {
    signUp: (options: {
      email: string;
      password: string;
      options?: { data?: any };
    }) => Promise<any>;
    getUser: () => Promise<{ data: { user: any }; error: any }>;
    signInWithPassword: (credentials: {
      email: string;
      password: string;
    }) => Promise<any>;
  };
};

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
) as ExtendedSupabaseClient;
