"use client";

import { useState } from "react";

type UploadResponse = {
  ok?: boolean;
  storedAs?: string;
  bytes?: number;
  note?: string;
  error?: string;
};

export default function UploadsPage() {
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUploading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const json = (await response.json()) as UploadResponse;
    setResult(json);
    setIsUploading(false);
  }

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Multipart Upload</h2>

      <form onSubmit={onSubmit} className="card max-w-xl space-y-3">
        <input name="file" type="file" required className="block w-full text-sm" />
        <button
          disabled={isUploading}
          className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-white disabled:opacity-70"
          type="submit"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {result ? <pre className="code-block">{JSON.stringify(result, null, 2)}</pre> : null}

      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive</h3>
        <p className="text-sm text-muted">
          This runs on Node runtime and writes to local disk. On serverless, disk can be ephemeral;
          production architecture usually streams to object storage (S3/GCS) directly.
        </p>
      </section>
    </main>
  );
}
