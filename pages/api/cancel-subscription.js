import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  console.log("Cancel subscription API called");

  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("1. Parsing request body");
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      console.log("Missing subscription ID");
      return res.status(400).json({ error: "Subscription ID is required" });
    }

    console.log("2. Checking authorization header");
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("No authorization header");
      return res.status(401).json({ error: "No authorization header" });
    }

    console.log("3. Creating Supabase clients");
    // Create a Supabase client with service role key (bypasses RLS)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Also create regular client for user auth verification
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log("4. Verifying user authentication");
    // Verify user authentication with regular client
    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser(token);

    if (authError) {
      console.log("Auth error:", authError);
      return res
        .status(401)
        .json({ error: "Invalid authentication", details: authError.message });
    }

    if (!user) {
      console.log("No user found");
      return res.status(401).json({ error: "Invalid authentication" });
    }

    console.log(
      `5. Fetching subscription ${subscriptionId} for user ${user.id}`
    );

    // First, verify the subscription exists and belongs to the user
    const { data: subscription, error: fetchError } = await supabaseAdmin
      .from("subscription")
      .select("*")
      .eq("id", subscriptionId)
      .single();

    if (fetchError) {
      console.error("Error fetching subscription:", fetchError);
      return res.status(500).json({
        error: "Failed to fetch subscription",
        details: fetchError.message,
      });
    }

    if (!subscription) {
      console.log("Subscription not found");
      return res.status(404).json({ error: "Subscription not found" });
    }

    console.log("6. Verifying subscription ownership");
    // Verify ownership
    if (subscription.user_id !== user.id) {
      console.log("Ownership verification failed");
      return res
        .status(403)
        .json({ error: "You can only cancel your own subscriptions" });
    }

    if (subscription.status === "CANCELED") {
      console.log("Subscription already canceled");
      return res
        .status(400)
        .json({ error: "Subscription is already canceled" });
    }

    console.log("7. Updating subscription status");
    // Use admin client to update subscription (bypasses RLS)
    const { data: updatedSubscription, error: updateError } =
      await supabaseAdmin
        .from("subscription")
        .update({ status: "CANCELED" })
        .eq("id", subscriptionId)
        .select()
        .single();

    if (updateError) {
      console.error("Error updating subscription:", updateError);
      return res.status(500).json({
        error: "Failed to cancel subscription",
        details: updateError.message,
      });
    }

    console.log(`8. Successfully canceled subscription ${subscriptionId}`);

    return res.status(200).json({
      success: true,
      data: updatedSubscription,
      message: "Subscription canceled successfully",
    });
  } catch (error) {
    console.error("Unexpected API error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
      stack: error.stack,
    });
  }
}
