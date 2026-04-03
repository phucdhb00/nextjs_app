import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/auth/protected", "/uploads"];

export function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const { pathname } = request.nextUrl;

  // Middleware runs before route matching, ideal for tracing and coarse auth checks.
  console.info(`[mw][${requestId}] ${request.method} ${pathname}`);

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtected) {
    const token = request.cookies.get("session_token")?.value;
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-request-id", requestId);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/ws-health).*)"],
};
