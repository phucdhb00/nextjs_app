import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";
import { WebSocketServer } from "ws";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT ?? 3000);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  handle(req, res, parsedUrl);
});

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (socket) => {
  socket.send(
    JSON.stringify({
      type: "welcome",
      message: "Connected to standalone WS server behind Next.js custom server",
      at: new Date().toISOString(),
    }),
  );

  const interval = setInterval(() => {
    socket.send(
      JSON.stringify({
        type: "tick",
        at: new Date().toISOString(),
      }),
    );
  }, 2000);

  socket.on("message", (raw) => {
    socket.send(JSON.stringify({ type: "echo", payload: raw.toString() }));
  });

  socket.on("close", () => clearInterval(interval));
});

server.on("upgrade", (request, socket, head) => {
  if (request.url !== "/ws") {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(port, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
  console.log(`> WebSocket endpoint ws://${hostname}:${port}/ws`);
});
