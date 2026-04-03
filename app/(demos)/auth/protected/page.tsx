import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/server/auth";
import Link from "next/link";

export default async function ProtectedPage() {
  // Middleware already redirects unauthenticated requests for /auth/protected,
  // but we also verify server-side for defense-in-depth.
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  const session = token ? verifySessionToken(token) : null;

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Protected Route</h2>

      {session ? (
        <div className="card max-w-md">
          <p className="text-green-700 font-medium">
            ✓ Authenticated as {session.sub} ({session.role})
          </p>
          <p className="mt-1 text-sm text-muted">
            You reached this page because middleware found your session cookie and allowed the
            request through. The server component then re-verified the token.
          </p>
        </div>
      ) : (
        <div className="card max-w-md">
          <p className="text-red-600 font-medium">
            Token present but invalid or expired.
          </p>
          <Link href="/auth/login?from=/auth/protected" className="text-accent underline text-sm">
            Sign in again
          </Link>
        </div>
      )}

      {/* ── Deep Dive ─────────────────────────────────────────── */}
      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive: Middleware Guard vs Server Auth</h3>

        <pre className="code-block mt-2">{`Layered security model:

Layer 1 — Middleware (Edge)
  • Runs BEFORE route matching
  • Checks cookie EXISTENCE (cheap)
  • Redirects to /auth/login if missing
  • Cannot do heavy crypto on all edge platforms

Layer 2 — Server Component (Node.js)
  • Runs DURING render
  • Verifies token SIGNATURE + EXPIRY (full crypto)
  • Returns personalized UI or redirect

Why both?
  Middleware is a coarse gatekeeper (like Spring's OncePerRequestFilter).
  Server component auth is fine-grained (like @PreAuthorize).
  Together they form defense-in-depth.`}</pre>

        <h4 className="mt-3 text-sm font-semibold">Edge Runtime Limitations</h4>
        <p className="text-sm text-muted">
          Middleware runs in the Edge Runtime — a V8 isolate without full Node.js APIs. On some
          platforms, <code>node:crypto</code> (needed for HMAC verification) is not available at the
          edge. That's why middleware does a lightweight cookie-existence check and the heavy
          verification is deferred to the Node.js server component.
        </p>

        <h4 className="mt-3 text-sm font-semibold">Common Mistake</h4>
        <p className="text-sm text-muted">
          Relying only on middleware for auth. Since middleware can be bypassed during internal
          navigations (soft navigations via the client-side router), always verify in the server
          component or route handler too.
        </p>
      </section>
    </main>
  );
}
