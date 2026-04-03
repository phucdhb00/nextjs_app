"use client";

import { useEffect, useState } from "react";

export default function EmbeddedPage() {
  const [received, setReceived] = useState<string[]>([]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Validate origin — only accept messages from our own host.
      if (event.origin !== window.location.origin) return;

      const data = event.data as { type?: string; text?: string };
      setReceived((prev) => [...prev.slice(-9), JSON.stringify(data)]);

      // Echo back to parent with acknowledgement.
      if (event.source && typeof (event.source as Window).postMessage === "function") {
        (event.source as Window).postMessage(
          { type: "iframe-reply", echo: data.text, repliedAt: Date.now() },
          event.origin,
        );
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div style={{ padding: 12, fontFamily: "monospace", fontSize: 13, background: "#f0f8f6" }}>
      <strong>Embedded iframe page</strong>
      <p style={{ margin: "6px 0 4px", color: "#555" }}>
        Listening for postMessage…
      </p>
      {received.map((msg, i) => (
        <div key={i} style={{ color: "#0f766e" }}>
          ← {msg}
        </div>
      ))}
    </div>
  );
}
