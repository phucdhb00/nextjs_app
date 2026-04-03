import { WsClient } from "./ws-client";

export default function WebSocketPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Real-Time WebSocket</h2>

      <div className="card text-sm text-muted">
        <strong>Prerequisite:</strong> Run the app with the custom server:{" "}
        <code className="rounded bg-surface-strong px-1.5 py-0.5">npm run dev:ws</code>
        <br />
        The standard <code>npm run dev</code> does not start the WebSocket endpoint.
      </div>

      <WsClient />

      {/* ── Deep Dive ─────────────────────────────────────────── */}
      <section className="deep-dive">
        <h3 className="font-semibold">Deep Dive: Why Next.js Can't Do WebSockets Natively</h3>

        <pre className="code-block mt-2">{`Architecture constraint:

App Router Route Handlers are REQUEST → RESPONSE oriented.
  fetch('/api/endpoint') → JSON response → connection closed

WebSocket requires a long-lived, bi-directional TCP connection:
  Browser ──upgrade──▶ Server
  Browser ◀──frames──▶ Server  (kept open indefinitely)

Route Handlers run in serverless-compatible environments where
connections are short-lived. There is no API to "hold open" a
request and push frames.

─── Solution Approaches ───

1. Custom Node.js server (this demo)
   • server.mjs wraps Next.js + ws library
   • HTTP upgrade on /ws path → WebSocket
   • Full control, but loses Vercel serverless deploy

2. Separate WS microservice
   • Next.js handles HTTP/pages
   • Dedicated WS server (Socket.io, ws, uWebSockets)
   • Connected via shared auth token
   • Best for production at scale

3. Server-Sent Events (SSE)
   • One-way server→client push
   • Works in Route Handlers (streaming response)
   • No bi-directional messaging`}</pre>

        <h4 className="mt-3 text-sm font-semibold">How server.mjs Works</h4>
        <pre className="code-block mt-2">{`const server = createServer(nextHandler);
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  if (req.url === '/ws') {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  } else {
    socket.destroy(); // reject non-WS upgrades
  }
});

Key: { noServer: true } means ws won't bind its own port.
Instead, we intercept the HTTP upgrade event and hand it off.`}</pre>

        <h4 className="mt-3 text-sm font-semibold">Spring Boot Comparison</h4>
        <p className="text-sm text-muted">
          In Spring, <code>@ServerEndpoint</code> or{" "}
          <code>@EnableWebSocket</code> + <code>WebSocketHandler</code> integrates directly into the
          embedded Tomcat/Jetty server. Next.js has no equivalent — the framework is designed around
          request-response HTTP. You must bring your own transport layer for persistent connections.
        </p>

        <h4 className="mt-3 text-sm font-semibold">Common Mistake</h4>
        <p className="text-sm text-muted">
          Simulating real-time with polling (<code>setInterval + fetch</code>). This wastes bandwidth
          and adds latency. True WebSocket push is more efficient for high-frequency updates.
          Another mistake: deploying a custom server to Vercel — it won't work because Vercel
          functions are stateless and short-lived.
        </p>
      </section>
    </main>
  );
}
