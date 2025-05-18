import { NextResponse } from "next/server";
import { supabase } from "../../../api/apiClient";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

export async function POST(request: Request) {
  const { action, email, password, fullName } = await request.json();

  if (action === "register") {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Registration successful. Please verify your email.",
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Unexpected error occurred" },
        { status: 500 }
      );
    }
  } else if (action === "login") {
    try {
      const { data: authData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        return NextResponse.json(
          { success: false, error: loginError.message },
          { status: 400 }
        );
      }

      const user = authData.user;
      const userId = user.id;

      // Check if user_account exists
      const { data: userAccount, error: fetchError } = await supabase
        .from("user_account")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        return NextResponse.json(
          { success: false, error: fetchError.message },
          { status: 500 }
        );
      }

      // If not found, insert a new row with full metadata
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
          return NextResponse.json(
            { success: false, error: insertError.message },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          data: {
            authUser: user,
            userAccount: newUserAccount,
          },
        });
      }

      // If user_account exists, return it
      return NextResponse.json({
        success: true,
        data: {
          authUser: user,
          userAccount,
        },
      });
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Unexpected error occurred" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { success: false, error: "Invalid action" },
    { status: 400 }
  );
}
