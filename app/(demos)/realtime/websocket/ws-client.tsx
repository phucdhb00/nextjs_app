"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type WsMessage = {
  type: string;
  message?: string;
  payload?: string;
  at?: string;
};

export function WsClient() {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const appendMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev.slice(-49), text]); // keep last 50
  }, []);

  useEffect(() => {
    // Determine WS URL relative to current host so it works on any port.
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    setStatus("connecting");
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.addEventListener("open", () => {
      setStatus("connected");
      appendMessage("[system] Connected to WebSocket server");
    });

    ws.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data as string) as WsMessage;
        appendMessage(`[${data.type}] ${data.message ?? data.payload ?? data.at ?? JSON.stringify(data)}`);
      } catch {
        appendMessage(`[raw] ${String(event.data)}`);
      }
    });

    ws.addEventListener("close", () => {
      setStatus("disconnected");
      appendMessage("[system] Disconnected");
    });

    ws.addEventListener("error", () => {
      appendMessage("[error] WebSocket error — is the custom server running? (npm run dev:ws)");
    });

    return () => {
      ws.close();
    };
  }, [appendMessage]);

  // Auto-scroll message list
  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  function send() {
    if (!input.trim() || socketRef.current?.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(input);
    appendMessage(`[you] ${input}`);
    setInput("");
  }

  const statusColor =
    status === "connected"
      ? "text-green-700"
      : status === "connecting"
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="space-y-3">
      <p className={`text-sm font-medium ${statusColor}`}>
        Status: {status}
      </p>

      <div
        ref={listRef}
        className="card h-64 overflow-y-auto font-mono text-xs leading-relaxed"
      >
        {messages.length === 0 ? (
          <p className="text-muted">Waiting for messages…</p>
        ) : (
          messages.map((msg, i) => <div key={i}>{msg}</div>)
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message to echo…"
          className="flex-1 rounded-md border border-border bg-surface-strong px-3 py-2 text-sm"
        />
        <button
          onClick={send}
          disabled={status !== "connected"}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
