"use client";

import { useEffect, useState } from "react";

type Payload = { generatedAt: string; random: number };

export function ClientPanel() {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/api/cache-demo")
      .then((res) => res.json())
      .then((json: Payload) => setData(json));
  }, []);

  return <pre className="code-block">{JSON.stringify(data, null, 2)}</pre>;
}
