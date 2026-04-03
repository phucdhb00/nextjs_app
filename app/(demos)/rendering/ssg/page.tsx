const builtAt = new Date().toISOString();

export default function SSGPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">SSG Demo</h2>
      <p className="card">Build-time timestamp: {builtAt}</p>

      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive</h3>
        <p className="text-sm text-muted">
          What: prerender at build. Internally Next emits HTML/RSC artifacts and serves from static
          cache/CDN. Use for docs, marketing pages. Trade-off: stale data until next build.
          Mistake: using SSG for data that must be fresh per request.
        </p>
      </section>
    </main>
  );
}
