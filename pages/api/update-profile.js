import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name } = req.body;
    const authHeader = req.headers.authorization;

    console.log("=== Profile Update API ===");
    console.log("Request body:", req.body);
    console.log("Name:", name);
    console.log("Has auth header:", !!authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Missing auth header");
      return res
        .status(401)
        .json({ error: "Missing or invalid authorization header" });
    }

    const token = authHeader.substring(7);
    console.log("Token length:", token.length);

    // Create a Supabase client with the user's session token
    const userSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    console.log("Created user supabase client");

    // Verify the user's authentication
    const {
      data: { user },
      error: authError,
    } = await userSupabase.auth.getUser();

    console.log("Auth result:", {
      userId: user?.id,
      userEmail: user?.email,
      authError: authError?.message,
    });

    if (authError || !user) {
      console.log("Auth failed:", authError);
      return res.status(401).json({ error: "Invalid authentication" });
    }

    if (!name || name.trim() === "") {
      console.log("Name validation failed");
      return res.status(400).json({ error: "Name is required" });
    }

    console.log("Starting database operations...");

    // Just return success for now to test if the issue is with auth or database
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        message: "Auth verified successfully",
        name: name.trim(),
      },
    });
  } catch (error) {
    console.error("=== API Error ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
      stack: error.stack,
    });
  }
}
