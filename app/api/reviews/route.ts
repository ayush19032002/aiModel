import { NextResponse } from "next/server";
import { getReviews } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getReviews());
}
