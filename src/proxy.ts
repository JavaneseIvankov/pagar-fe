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
    pathname.startsWith("/profil") ||
    pathname.startsWith("/tambah-laporan")
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
      : "/laporan-masyarakat";

    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (pathname === "/dashboard") {
    const destination = session
      ? getAuthenticatedLandingPath(session.user.role)
      : "/auth/masuk";

    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (isAuthPath(pathname) && session) {
    return NextResponse.redirect(
      new URL(getAuthenticatedLandingPath(session.user.role), request.url),
    );
  }

  if (!session && isProtectedPath(pathname)) {
    return NextResponse.redirect(new URL("/auth/masuk", request.url));
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
    "/dashboard",
    "/auth/:path*",
    "/dashboard/:path*",
    "/profil",
    "/tambah-laporan",
  ],
};
