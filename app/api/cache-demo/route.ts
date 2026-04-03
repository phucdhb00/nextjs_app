import { NextResponse } from "next/server";

export async function GET() {
  const random = Math.floor(Math.random() * 10000);
  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      random,
    },
    {
      headers: {
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    },
  );
}
