import Link from "next/link";
import { demoNav } from "@/lib/shared/constants";

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <header className="mb-6 rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted">Next.js Internals Lab</p>
            <h1 className="text-2xl font-bold">Demos</h1>
          </div>
          <Link href="/" className="rounded-md bg-accent px-3 py-2 text-sm text-white">
            Overview
          </Link>
        </div>

        <nav className="mt-4 flex flex-wrap gap-2">
          {demoNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-border bg-surface-strong px-3 py-1.5 text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}
    </div>
  );
}
