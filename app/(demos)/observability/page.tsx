export default function ObservabilityPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Observability</h2>
      <p className="text-muted">
        Use middleware request IDs, server logs, and browser network timelines together.
      </p>

      <pre className="code-block">{`[mw][request-id] GET /rendering/ssr
[server][timestamp] GET /api/time
[server][timestamp] SSR page rendered`}</pre>

      <section className="card">
        <h3 className="font-semibold">Request Lifecycle Diagram</h3>
        <pre className="code-block mt-2">{`Client -> Middleware -> Route Match -> Data Fetch -> RSC render -> Stream -> Hydration`}</pre>
      </section>

      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive</h3>
        <p className="text-sm text-muted">
          In classic backend apps, controller timing is often enough. In Next.js you must also track
          render mode, cache hits, and hydration costs to explain user-perceived latency.
        </p>
      </section>
    </main>
  );
}
