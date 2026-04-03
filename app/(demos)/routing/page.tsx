import Link from "next/link";

export default function RoutingIndexPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Advanced Routing</h2>
      <div className="grid-cards">
        <Link href="/routing/dynamic-routes" className="card">
          Dynamic Routes
        </Link>
        <Link href="/routing/parallel-routes" className="card">
          Parallel Routes
        </Link>
        <Link href="/routing/intercepting-routes" className="card">
          Intercepting Routes
        </Link>
      </div>
      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive</h3>
        <p className="text-sm text-muted">
          If you come from Spring MVC, dynamic routes resemble path variables, while parallel routes
          are closer to composing multiple controller responses into one shell.
        </p>
      </section>
    </main>
  );
}
