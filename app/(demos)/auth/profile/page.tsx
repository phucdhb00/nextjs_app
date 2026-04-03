import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/server/auth";
import Link from "next/link";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    redirect("/auth/login?from=/auth/profile");
  }

  const session = verifySessionToken(token);

  if (!session) {
    redirect("/auth/login?from=/auth/profile");
  }

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Profile (Server-Validated)</h2>

      <div className="card max-w-md space-y-2">
        <p>
          <span className="font-medium">Subject:</span> {session.sub}
        </p>
        <p>
          <span className="font-medium">Role:</span> {session.role}
        </p>
        <p>
          <span className="font-medium">Expires:</span>{" "}
          {new Date(session.exp * 1000).toISOString()}
        </p>
      </div>

      <form action="/api/auth/logout" method="POST">
        <button
          type="submit"
          className="rounded-md border border-border px-4 py-2 text-sm"
        >
          Sign out
        </button>
      </form>

      <Link
        href="/auth/protected"
        className="inline-block rounded-md bg-accent px-3 py-2 text-sm text-white"
      >
        Visit protected route →
      </Link>

      {/* ── Deep Dive ─────────────────────────────────────────── */}
      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive: Server-Side Token Verification</h3>

        <pre className="code-block mt-2">{`Server Component render
  1. cookies() reads request cookies (dynamic signal → opts out of static cache)
  2. verifySessionToken() re-computes HMAC signature
  3. Checks expiration
  4. Returns decoded payload or null → redirect

This runs on every request — the page is always dynamic.`}</pre>

        <h4 className="mt-3 text-sm font-semibold">Spring Boot Comparison</h4>
        <p className="text-sm text-muted">
          This is analogous to reading <code>SecurityContextHolder.getContext().getAuthentication()</code>{" "}
          inside a controller method. The key difference: in Next.js there is no persistent security
          context across the request — you re-verify the token each time via cookies().
        </p>

        <h4 className="mt-3 text-sm font-semibold">Trade-off: cookies() makes the route dynamic</h4>
        <p className="text-sm text-muted">
          Calling <code>cookies()</code> is a dynamic function — Next.js cannot statically generate
          this page. This is correct for personalised content, but be deliberate: if a page doesn't
          need per-user data, avoid dynamic signals so it can be cached.
        </p>
      </section>
    </main>
  );
}
