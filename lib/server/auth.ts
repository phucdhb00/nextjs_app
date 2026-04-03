import { createHmac, timingSafeEqual } from "node:crypto";

type SessionPayload = {
  sub: string;
  role: "admin" | "reader";
  exp: number;
};

const SECRET = process.env.AUTH_SECRET ?? "dev-only-secret-change-me";

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function sign(data: string) {
  return createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function createSessionToken(sub: string, role: SessionPayload["role"]) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload: SessionPayload = {
    sub,
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 30,
  };
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(`${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

export function verifySessionToken(token: string) {
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) return null;

  const expected = sign(`${header}.${body}`);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf-8")) as SessionPayload;
  if (parsed.exp * 1000 < Date.now()) return null;
  return parsed;
}
