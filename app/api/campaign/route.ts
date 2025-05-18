import { NextResponse } from "next/server";
import { supabase } from "../../../api/apiClient";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const { data, error } = await supabase
      .from("marketing_campaign")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: `Error fetching campaign with id ${id}` },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } else {
    const { data, error } = await supabase
      .from("marketing_campaign")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Error fetching campaigns" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("marketing_campaign")
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Error creating campaign" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
