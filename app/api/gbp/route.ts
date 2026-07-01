import { NextResponse } from "next/server";
import { getGbpAudit } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getGbpAudit());
}
