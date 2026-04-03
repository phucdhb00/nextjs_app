"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get("from") ?? "/auth/profile";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const username = form.get("username") as string;
    const password = form.get("password") as string;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      setError(body.error ?? "Login failed");
      setLoading(false);
      return;
    }

    // Cookie is set by the route handler (httpOnly).
    // We redirect client-side; middleware will now see the cookie.
    router.push(redirectTo);
  }

  return (
    <form onSubmit={onSubmit} className="card max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          defaultValue="backend"
          required
          className="mt-1 w-full rounded-md border border-border bg-surface-strong px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue="nextjs"
          required
          className="mt-1 w-full rounded-md border border-border bg-surface-strong px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-xs text-muted">Demo credentials: backend / nextjs</p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Login</h2>

      <Suspense fallback={<div className="card max-w-md">Loading form…</div>}>
        <LoginForm />
      </Suspense>

      {/* ── Deep Dive ─────────────────────────────────────────── */}
      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive: Auth Flow</h3>

        <pre className="code-block mt-2">{`Browser ─POST─▶ /api/auth/login (Route Handler)
  1. Validate credentials
  2. Create signed token (HMAC-SHA256)
  3. Set httpOnly cookie in response
  ◀── 200 + Set-Cookie ──

Browser ─GET─▶ /auth/profile
  1. Middleware reads cookie → passes through
  2. Server Component reads cookie → verifySessionToken()
  3. Renders personalised page`}</pre>

        <h4 className="mt-3 text-sm font-semibold">Why httpOnly cookie?</h4>
        <p className="text-sm text-muted">
          Storing tokens in localStorage or JS-accessible cookies exposes them to XSS. httpOnly
          cookies are invisible to JavaScript and sent automatically by the browser.
        </p>

        <h4 className="mt-3 text-sm font-semibold">Edge vs Server Auth</h4>
        <p className="text-sm text-muted">
          Middleware runs at the Edge (lightweight V8 isolates). It can read cookies and do coarse
          allow/deny, but full token verification with node:crypto may not be available on all edge
          platforms. Fine-grained checks belong in Server Components or Route Handlers running on
          Node.js runtime.
        </p>

        <h4 className="mt-3 text-sm font-semibold">Spring Boot Comparison</h4>
        <p className="text-sm text-muted">
          Middleware ≈ Servlet Filter / Spring Security filter chain (coarse intercept).
          Route Handler ≈ @RestController endpoint.
          Server Component auth check ≈ @PreAuthorize on a service method.
        </p>
      </section>
    </main>
  );
}
