export const dynamic = "force-dynamic";

export default async function ServerFetchPage() {
  const response = await fetch("http://localhost:3000/api/cache-demo", {
    cache: "force-cache",
  });
  const payload = (await response.json()) as { generatedAt: string; random: number };

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Server Component fetch()</h2>
      <pre className="code-block">{JSON.stringify(payload, null, 2)}</pre>
      <section className="deep-dive">
        <p className="text-sm text-muted">
          In App Router, server-side fetch integrates with Next cache and request memoization.
          Similar to a service layer call in Spring, but with rendering-aware caching semantics.
        </p>
      </section>
    </main>
  );
}
