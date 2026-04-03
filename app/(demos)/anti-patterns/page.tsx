export default function AntiPatternsPage() {
  return (
    <main className="space-y-5">
      <h2 className="text-2xl font-semibold">Anti-patterns</h2>

      <section className="card">
        <h3 className="font-semibold">1) Unnecessary Client Components</h3>
        <pre className="code-block mt-2">{`// WRONG
"use client";
export default function ProductList() { return <div>static html</div>; }

// RIGHT
export default async function ProductList() { return <div>static html</div>; }`}</pre>
      </section>

      <section className="card">
        <h3 className="font-semibold">2) Breaking Cache Unintentionally</h3>
        <pre className="code-block mt-2">{`// WRONG: default no-store due dynamic signal
cookies();
await fetch(url);

// RIGHT: isolate dynamic branch or specify fetch cache mode intentionally`}</pre>
      </section>

      <section className="card">
        <h3 className="font-semibold">3) useEffect Data Fetch For Initial Content</h3>
        <pre className="code-block mt-2">{`// WRONG: blank first paint + SEO loss
useEffect(() => { fetch('/api/products') }, []);

// RIGHT: load initial data in server component`}</pre>
      </section>

      <section className="card">
        <h3 className="font-semibold">4) Blocking Server Rendering</h3>
        <pre className="code-block mt-2">{`// WRONG: await slow operations serially
const a = await slowA();
const b = await slowB();

// RIGHT: parallelize
const [a, b] = await Promise.all([slowA(), slowB()]);`}</pre>
      </section>
    </main>
  );
}
