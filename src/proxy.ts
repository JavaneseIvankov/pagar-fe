import { type NextRequest, NextResponse } from "next/server";
import {
  AUTH_SESSION_COOKIE_NAME,
  canRoleAccessPath,
  getAuthenticatedLandingPath,
  parseAuthSessionCookieValue,
} from "@/lib/auth";

function isProtectedPath(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/create-report")
  );
}

function isAuthPath(pathname: string) {
  return pathname.startsWith("/auth");
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = parseAuthSessionCookieValue(
    request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );

  if (pathname === "/") {
    const destination = session
      ? getAuthenticatedLandingPath(session.user.role)
      : "/public-report";

    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (isAuthPath(pathname) && session) {
    return NextResponse.redirect(
      new URL(getAuthenticatedLandingPath(session.user.role), request.url),
    );
  }

  if (!session && isProtectedPath(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    session &&
    isProtectedPath(pathname) &&
    !canRoleAccessPath(session.user.role, pathname)
  ) {
    return NextResponse.redirect(
      new URL(getAuthenticatedLandingPath(session.user.role), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
    "/profile",
    "/create-report",
  ],
};
