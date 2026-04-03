import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedPhotoModal({ params }: Props) {
  const { id } = await params;

  return (
    <div className="fixed inset-0 bg-black/45 p-6">
      <div className="mx-auto max-w-md rounded-lg bg-surface p-4">
        <h2 className="text-xl font-semibold">Intercepted Photo {id}</h2>
        <p className="mt-2 text-sm text-muted">Rendered as modal while URL still points to photo.</p>
        <Link href="/routing/intercepting-routes/feed" className="mt-3 inline-block rounded bg-accent px-3 py-2 text-white">
          Close
        </Link>
      </div>
    </div>
  );
}
