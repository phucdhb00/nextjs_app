import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/server/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };

  if (body.username !== "backend" || body.password !== "nextjs") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken(body.username, "admin");
  const response = NextResponse.json({ ok: true });

  response.cookies.set("session_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 30,
    path: "/",
  });

  return response;
}
