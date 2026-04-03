import { buildHeavyReport } from "@/lib/server/heavy-report";
import { Counter } from "./counter";

export default async function ServerClientBoundaryPage() {
  const report = await buildHeavyReport("server-only-input");

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Server vs Client Components</h2>
      <pre className="code-block">{JSON.stringify(report, null, 2)}</pre>
      <Counter />

      <section className="card">
        <h3 className="font-semibold">What Breaks If Misused</h3>
        <pre className="code-block mt-2">{`// INVALID in Server Component
useState(0)

// INVALID in Client Component
import fs from 'node:fs'`}</pre>
      </section>

      <section className="deep-dive">
        <p className="text-sm text-muted">
          Server components are similar to backend template rendering with privileged access.
          Client components are browser islands. Crossing the boundary serializes props, so avoid
          passing huge objects and keep boundaries intentional.
        </p>
      </section>
    </main>
  );
}
