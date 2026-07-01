import { NextResponse } from "next/server";
import { getLeads, addLead } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getLeads());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newLead = addLead(body);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
