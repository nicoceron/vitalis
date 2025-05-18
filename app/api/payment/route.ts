import { NextResponse } from "next/server";
import { supabase } from "../../../api/apiClient";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (userId) {
    const { data, error } = await supabase
      .from("payment")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return NextResponse.json(
        { error: `Error fetching payments for user ${userId}` },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("payment")
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Error creating payment" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
