import Link from "next/link";

const lifecycle = `Browser -> Middleware -> App Router -> Server Components -> HTML/RSC stream -> Hydration`;

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="hero">
        <h2 className="text-3xl font-semibold">Understand How Next.js Works Internally</h2>
        <p className="mt-2 max-w-3xl text-muted">
          This project is structured as a systems lab. Every route includes implementation and deep
          dive notes: what it does, internal mechanics, use cases, trade-offs, and common mistakes.
        </p>
      </section>

      <section className="grid-cards">
        <article className="card">
          <h3 className="text-lg font-semibold">Request Lifecycle</h3>
          <p className="mt-1 text-sm text-muted">{lifecycle}</p>
          <pre className="code-block mt-3">{`HTTP request
  -> middleware.ts
  -> route match
  -> render RSC tree
  -> stream shell/chunks
  -> hydrate client islands`}</pre>
        </article>

        <article className="card">
          <h3 className="text-lg font-semibold">Server vs Client Boundary</h3>
          <pre className="code-block mt-2">{`Server Component
  - direct DB/API access
  - no useState/useEffect

Client Component
  - browser events/hooks
  - no server secrets`}</pre>
        </article>

        <article className="card">
          <h3 className="text-lg font-semibold">Start Here</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link className="text-accent underline" href="/rendering">
                Rendering Modes
              </Link>
            </li>
            <li>
              <Link className="text-accent underline" href="/data-fetching">
                Data Fetching + Caches
              </Link>
            </li>
            <li>
              <Link className="text-accent underline" href="/routing">
                Advanced Routing
              </Link>
            </li>
          </ul>
        </article>
      </section>

      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive: Architecture Strategy</h3>
        <p className="text-sm text-muted">
          The structure uses route groups for modularity and backend-style separation in <code>lib</code>{" "}
          (`server`, `client`, `shared`). Think of this as separating controller, service, and DTO
          concerns in Spring Boot.
        </p>
      </section>
    </main>
  );
}
