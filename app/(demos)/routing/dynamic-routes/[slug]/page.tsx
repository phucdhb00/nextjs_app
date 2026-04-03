type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DynamicRouteDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Dynamic Route Detail</h2>
      <p className="card">Resolved slug: {slug}</p>
      <section className="deep-dive">
        <p className="text-sm text-muted">
          This maps like Spring path variables (<code>/resource/&#123;id&#125;</code>), but in
          file-system routing.
        </p>
      </section>
    </main>
  );
}
