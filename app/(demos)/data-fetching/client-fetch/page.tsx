import { ClientPanel } from "./client-panel";

export default function ClientFetchPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Client-side Fetching</h2>
      <ClientPanel />
      <section className="deep-dive">
        <p className="text-sm text-muted">
          Client fetching bypasses server prerender for initial data, then uses browser networking.
          Great for user actions/polling, weaker for SEO-critical first paint.
        </p>
      </section>
    </main>
  );
}
