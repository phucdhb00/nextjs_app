import Link from "next/link";

const slugs = ["invoice-42", "invoice-2026-04", "team-ops"];

export default function DynamicRoutesIndexPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Dynamic Routes</h2>
      <div className="grid-cards">
        {slugs.map((slug) => (
          <Link key={slug} href={`/routing/dynamic-routes/${slug}`} className="card">
            {slug}
          </Link>
        ))}
      </div>
    </main>
  );
}
