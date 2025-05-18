import { NextResponse } from "next/server";
import { supabase } from "../../../api/apiClient";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const { data, error } = await supabase
      .from("user_account")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: `Error fetching user with id ${id}` },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } else {
    const { data, error } = await supabase.from("user_account").select("*");

    if (error) {
      return NextResponse.json(
        { error: "Error fetching users" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  }
}

export async function PUT(request: Request) {
  const { id, updates } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("user_account")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: `Error updating user with id ${id}` },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
