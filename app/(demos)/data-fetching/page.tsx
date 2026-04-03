import Link from "next/link";

export default function DataFetchingIndexPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Data Fetching</h2>
      <p className="text-muted">
        Learn fetch behavior in server and client components, and understand how Next.js cache
        differs from browser HTTP cache.
      </p>
      <div className="grid-cards">
        <Link href="/data-fetching/server-fetch" className="card">
          Server Fetch in RSC
        </Link>
        <Link href="/data-fetching/client-fetch" className="card">
          Client Fetch in Browser
        </Link>
        <Link href="/data-fetching/cache-strategies" className="card">
          force-cache / no-store / revalidate
        </Link>
      </div>
    </main>
  );
}
