// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const access = req.cookies.get("access")?.value;
  const refresh = req.cookies.get("refresh")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/get-started");

  // ✅ If no tokens at all → block user routes
  if (!access && !refresh && pathname.startsWith("/user")) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("reason", "no-session");
    return NextResponse.redirect(loginUrl);
  }

  // ✅ If refresh exists but access missing/expired → allow request
  // frontend will handle silent refresh
  if (!access && refresh && pathname.startsWith("/user")) {
    return NextResponse.next();
  }

  // ✅ If already logged in → block auth pages
  if ((access || refresh) && isAuthPage) {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/auth/:path*"],
};
