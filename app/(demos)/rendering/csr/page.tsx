import { ClientClock } from "./client-clock";

export default function CSRPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">CSR Demo</h2>
      <ClientClock />

      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive</h3>
        <p className="text-sm text-muted">
          What: data loaded in browser after hydration. Use for highly interactive views and
          user-only data. Trade-off: slower first meaningful content and potential SEO impact.
          Mistake: fetching primary page content only in useEffect.
        </p>
      </section>
    </main>
  );
}
