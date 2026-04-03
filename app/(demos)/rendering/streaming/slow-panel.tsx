export default async function SlowPanel() {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return <div className="card">Slow chunk resolved at {new Date().toISOString()}</div>;
}
