export const dynamic = "force-dynamic";

export default async function ISRPage() {
  const response = await fetch("http://localhost:3000/api/cache-demo", {
    next: { revalidate: 20 },
  });
  const payload = (await response.json()) as { generatedAt: string; random: number };

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">ISR Demo</h2>
      <p className="card">Cached payload (regenerates ~every 20s): {JSON.stringify(payload)}</p>

      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive</h3>
        <p className="text-sm text-muted">
          What: static output with timed revalidation. Internally first request after staleness can
          trigger background regeneration. Great for high-read, moderate-freshness pages. Mistake:
          expecting exact TTL expiration semantics like Redis.
        </p>
      </section>
    </main>
  );
}
