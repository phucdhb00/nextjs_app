export async function buildHeavyReport(seed: string) {
  const startedAt = Date.now();

  // Simulate expensive IO + computation that should never run in a browser bundle.
  await new Promise((resolve) => setTimeout(resolve, 350));

  const checksum = Array.from(seed).reduce((acc, char, idx) => {
    return acc + char.charCodeAt(0) * (idx + 1);
  }, 0);

  return {
    seed,
    checksum,
    generatedAt: new Date().toISOString(),
    elapsedMs: Date.now() - startedAt,
  };
}
