"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function IframePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState("Hello from parent");

  const appendLog = useCallback((entry: string) => {
    setLog((prev) => [...prev.slice(-29), entry]);
  }, []);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // SECURITY: always validate origin before trusting the message.
      if (event.origin !== window.location.origin) {
        appendLog(`[blocked] message from untrusted origin: ${event.origin}`);
        return;
      }
      appendLog(`[received] ${JSON.stringify(event.data)}`);
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [appendLog]);

  function sendToIframe() {
    if (!iframeRef.current?.contentWindow) return;
    const message = { type: "parent-message", text: input, sentAt: Date.now() };
    // SECURITY: specify exact targetOrigin, never use "*" in production.
    iframeRef.current.contentWindow.postMessage(message, window.location.origin);
    appendLog(`[sent] ${JSON.stringify(message)}`);
  }

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Iframe Integration</h2>

      {/* ── Controls ──────────────────────────────────────────── */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-md border border-border bg-surface-strong px-3 py-2 text-sm"
        />
        <button
          onClick={sendToIframe}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          Send to iframe
        </button>
      </div>

      {/* ── Iframe ────────────────────────────────────────────── */}
      <iframe
        ref={iframeRef}
        src="/integration/iframe/embedded"
        title="Embedded page"
        className="w-full rounded-lg border border-border"
        style={{ height: 200 }}
        sandbox="allow-scripts allow-same-origin"
      />

      {/* ── Message Log ───────────────────────────────────────── */}
      <div className="card h-48 overflow-y-auto font-mono text-xs leading-relaxed">
        {log.length === 0 ? (
          <p className="text-muted">No messages yet. Click &quot;Send to iframe&quot;.</p>
        ) : (
          log.map((entry, i) => <div key={i}>{entry}</div>)
        )}
      </div>

      {/* ── Deep Dive ─────────────────────────────────────────── */}
      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive: Iframe Communication & Security</h3>

        <pre className="code-block mt-2">{`postMessage Flow:

Parent                           Iframe (embedded page)
  │                                │
  │── postMessage(data, origin) ──▶│
  │                                │ window.addEventListener('message', handler)
  │                                │ handler checks event.origin
  │                                │
  │◀── postMessage(reply, origin) ─│
  │ handler checks event.origin    │

SECURITY RULES:
  1. Always validate event.origin before processing
  2. Never use "*" as targetOrigin in production
  3. Use sandbox attribute to restrict iframe capabilities
  4. Set Content-Security-Policy frame-ancestors to control who can embed you`}</pre>

        <h4 className="mt-3 text-sm font-semibold">Security Considerations</h4>
        <ul className="mt-1 space-y-1 text-sm text-muted">
          <li>
            <strong>Origin validation:</strong> Without checking <code>event.origin</code>, any page
            that embeds your app (or is embedded by it) can inject messages.
          </li>
          <li>
            <strong>sandbox attribute:</strong> Restricts the iframe from navigating the parent,
            accessing cookies, or running plugins. Use the minimum set of allow-* flags needed.
          </li>
          <li>
            <strong>CSP frame-ancestors:</strong> Server-side header that controls which domains can
            embed your page in an iframe. Set this in <code>next.config.ts</code> headers.
          </li>
          <li>
            <strong>X-Frame-Options:</strong> Legacy equivalent of frame-ancestors. Use both for
            backward compatibility.
          </li>
        </ul>

        <h4 className="mt-3 text-sm font-semibold">Spring Boot Comparison</h4>
        <p className="text-sm text-muted">
          In Spring, iframe security is handled via <code>X-Frame-Options</code> in{" "}
          <code>HttpSecurity.headers().frameOptions()</code> and CSP headers. The postMessage
          protocol is purely client-side and framework-agnostic.
        </p>
      </section>
    </main>
  );
}
