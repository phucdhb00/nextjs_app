import { NextResponse } from "next/server";
import { serverLog } from "@/lib/server/logger";

export async function GET() {
  serverLog("info", "GET /api/time");
  return NextResponse.json({
    nowIso: new Date().toISOString(),
    epochMs: Date.now(),
  });
}
