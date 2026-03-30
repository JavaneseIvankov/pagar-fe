import { type NextRequest, NextResponse } from "next/server";
import {
  AUTH_SESSION_COOKIE_NAME,
  canRoleAccessPath,
  getAuthenticatedLandingPath,
  parseAuthSessionCookieValue,
} from "@/lib/auth";
import { buildReturnToPath, LOGIN_RETURN_TO_PARAM } from "@/lib/auth/redirects";

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

function createLoginRedirectUrl(request: NextRequest) {
  const loginUrl = new URL("/auth/masuk", request.url);
  loginUrl.searchParams.set(
    LOGIN_RETURN_TO_PARAM,
    buildReturnToPath(request.nextUrl.pathname, request.nextUrl.search),
  );
  return loginUrl;
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
      : createLoginRedirectUrl(request);

    return NextResponse.redirect(
      typeof destination === "string"
        ? new URL(destination, request.url)
        : destination,
    );
  }

  if (isAuthPath(pathname) && session) {
    return NextResponse.redirect(
      new URL(getAuthenticatedLandingPath(session.user.role), request.url),
    );
  }

  if (!session && isProtectedPath(pathname)) {
    return NextResponse.redirect(createLoginRedirectUrl(request));
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
