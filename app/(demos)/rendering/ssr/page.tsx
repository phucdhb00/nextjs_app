import { serverLog } from "@/lib/server/logger";

export const dynamic = "force-dynamic";

export default async function SSRPage() {
  const response = await fetch("http://localhost:3000/api/time", {
    cache: "no-store",
  });
  const data = (await response.json()) as { nowIso: string; epochMs: number };

  serverLog("info", "SSR page rendered", data);

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">SSR Demo</h2>
      <p className="card">Rendered at request time: {data.nowIso}</p>

      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive</h3>
        <p className="text-sm text-muted">
          What: render HTML on each request. Internally Next marks route dynamic and skips full-page
          static cache. Use when personalized or rapidly changing data. Trade-off: higher server
          cost. Common mistake: using SSR everywhere and losing CDN-level caching.
        </p>
      </section>
    </main>
  );
}
