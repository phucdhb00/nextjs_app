export default function ParallelRoutesLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Parallel Routes</h2>
      {children}
      <div className="grid-cards">
        <section className="card">
          <h3 className="font-semibold">@analytics slot</h3>
          {analytics}
        </section>
        <section className="card">
          <h3 className="font-semibold">@team slot</h3>
          {team}
        </section>
      </div>
    </main>
  );
}
