import Link from "next/link";

export default function AuthIndexPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Authentication + Middleware</h2>
      <p className="text-muted">
        Demo uses signed token in httpOnly cookie. Middleware performs coarse guard; server pages
        verify token before sensitive rendering.
      </p>
      <div className="grid-cards">
        <Link href="/auth/login" className="card">
          Login flow
        </Link>
        <Link href="/auth/profile" className="card">
          Profile (server-validated)
        </Link>
        <Link href="/auth/protected" className="card">
          Protected route
        </Link>
      </div>
    </main>
  );
}
