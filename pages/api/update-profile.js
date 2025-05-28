import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Set CORS headers for development
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== Profile Update API ===");
    console.log("Request method:", req.method);
    console.log("Request body:", req.body);
    console.log("Headers:", req.headers);

    const { name } = req.body || {};

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    // For now, just return success to test the basic API functionality
    return res.status(200).json({
      success: true,
      data: {
        message: "Profile update API is working",
        name: name.trim(),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("=== API Error ===");
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
