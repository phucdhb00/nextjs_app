"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <p>Interactive client state: {count}</p>
      <button className="mt-2 rounded bg-accent px-3 py-1 text-white" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
    </div>
  );
}
