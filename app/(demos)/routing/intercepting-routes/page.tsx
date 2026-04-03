import Link from "next/link";

export default function InterceptingRoutesPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Intercepting Routes</h2>
      <p className="text-muted">
        Open feed and click an item. It can render as contextual modal while preserving URL.
      </p>
      <Link href="/routing/intercepting-routes/feed" className="rounded bg-accent px-3 py-2 text-white">
        Open feed
      </Link>
    </main>
  );
}
