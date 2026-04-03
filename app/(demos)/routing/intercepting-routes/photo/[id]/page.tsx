type Props = {
  params: Promise<{ id: string }>;
};

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Photo {id}</h2>
      <p className="card">Direct navigation renders a standalone page.</p>
    </main>
  );
}
