import { NextResponse } from "next/server";
import { createToken, hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "");
    const password = String(body.password || "");
    const valid = email.includes("@") && password.length >= 6;

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createToken({ email, name: "Arjun Sharma", role: "owner" });
    return NextResponse.json({
      status: "success",
      token,
      user: {
        email,
        name: "Arjun Sharma",
        role: "owner",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to authenticate" }, { status: 500 });
  }
}
