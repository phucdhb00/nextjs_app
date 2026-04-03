import Link from "next/link";

export default function RenderingIndexPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Rendering Modes</h2>
      <p className="text-muted">
        Compare SSR, SSG, ISR, CSR, and streaming. Use these pages with dev tools open and observe
        server logs + network waterfall.
      </p>

      <div className="grid-cards">
        {[
          ["/rendering/ssr", "SSR"],
          ["/rendering/ssg", "SSG"],
          ["/rendering/isr", "ISR"],
          ["/rendering/csr", "CSR"],
          ["/rendering/streaming", "Streaming"],
          ["/rendering/server-client-boundary", "Server/Client Boundary"],
        ].map(([href, label]) => (
          <Link key={href} href={href} className="card hover:border-accent">
            <h3 className="font-semibold">{label}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
