import Link from "next/link";

export default function FeedPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Feed</h2>
      <div className="grid-cards">
        {["1", "2", "3"].map((id) => (
          <Link key={id} href={`/routing/intercepting-routes/photo/${id}`} className="card">
            Open photo {id}
          </Link>
        ))}
      </div>
    </main>
  );
}
