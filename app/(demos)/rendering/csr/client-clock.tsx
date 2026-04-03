"use client";

import { useEffect, useState } from "react";

export function ClientClock() {
  const [time, setTime] = useState("loading...");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/time");
      const data = (await response.json()) as { nowIso: string };
      setTime(data.nowIso);
    }

    load();
  }, []);

  return <p className="card">Client-fetched timestamp: {time}</p>;
}
