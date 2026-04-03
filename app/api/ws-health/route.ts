import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    websocketSupportedHere: false,
    explanation:
      "App Router route handlers are request-response oriented; use a custom server or separate WS service for long-lived connections.",
  });
}
