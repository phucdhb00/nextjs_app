export const dynamic = "force-dynamic";

async function getCached() {
  const response = await fetch("http://localhost:3000/api/cache-demo", {
    cache: "force-cache",
  });
  return (await response.json()) as { generatedAt: string; random: number };
}

async function getNoStore() {
  const response = await fetch("http://localhost:3000/api/cache-demo", {
    cache: "no-store",
  });
  return (await response.json()) as { generatedAt: string; random: number };
}

async function getRevalidated() {
  const response = await fetch("http://localhost:3000/api/cache-demo", {
    next: { revalidate: 15 },
  });
  return (await response.json()) as { generatedAt: string; random: number };
}

export default async function CacheStrategiesPage() {
  const [cached, noStore, revalidated] = await Promise.all([
    getCached(),
    getNoStore(),
    getRevalidated(),
  ]);

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Cache Strategies</h2>
      <div className="grid-cards">
        <pre className="code-block">force-cache: {JSON.stringify(cached, null, 2)}</pre>
        <pre className="code-block">no-store: {JSON.stringify(noStore, null, 2)}</pre>
        <pre className="code-block">revalidate(15s): {JSON.stringify(revalidated, null, 2)}</pre>
      </div>

      <section className="deep-dive">
        <p className="text-sm text-muted">
          Next.js fetch cache is server-side render cache/memoization, not browser HTTP cache.
          Browser cache applies after response delivery and obeys HTTP headers. Next cache affects
          what server render sees before HTML reaches browser.
        </p>
      </section>
    </main>
  );
}
