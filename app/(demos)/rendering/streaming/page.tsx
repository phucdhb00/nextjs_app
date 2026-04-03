import { Suspense } from "react";
import SlowPanel from "./slow-panel";

export default function StreamingPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Streaming + Suspense</h2>

      <div className="card">Fast shell rendered immediately.</div>

      <Suspense fallback={<div className="card">Loading slow panel...</div>}>
        <SlowPanel />
      </Suspense>

      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive</h3>
        <p className="text-sm text-muted">
          Internally React streams HTML chunks by suspense boundary. Use for mixed latency pages.
          Trade-off: complexity and waterfall risk if boundaries are poorly designed.
        </p>
      </section>
    </main>
  );
}
