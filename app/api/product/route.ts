import { NextResponse } from "next/server";
import { supabase } from "../../../api/apiClient";
import type { Product, ProductId } from "@/lib/types";

// Use edge runtime to reduce serverless function count
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: `Error fetching product with id ${id}` },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } else {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Error fetching products" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  }
}
