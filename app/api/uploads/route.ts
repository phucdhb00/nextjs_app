import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "tmp-uploads");
  await mkdir(uploadDir, { recursive: true });

  const target = join(uploadDir, `${Date.now()}-${file.name}`);
  await writeFile(target, buffer);

  return NextResponse.json({
    ok: true,
    storedAs: target,
    bytes: buffer.length,
    note: "Local disk writes can be ephemeral on serverless platforms.",
  });
}
