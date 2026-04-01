import { type NextRequest, NextResponse } from "next/server";
import { getAuthenticatedLandingPath } from "@/lib/auth/navigation";
import { getAuthSessionFromRequest } from "@/lib/auth/request";
import { canRoleAccessPath } from "@/lib/auth/navigation";
import {
  AUTH_SESSION_EXPIRED_PATH,
  buildReturnToPath,
  LOGIN_RETURN_TO_PARAM,
} from "@/lib/auth/redirects";

function isProtectedPath(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/laporan-masyarakat") ||
    pathname.startsWith("/laporan-sppg") ||
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
  const session = getAuthSessionFromRequest(request);

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname === AUTH_SESSION_EXPIRED_PATH) {
    return NextResponse.next();
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
    "/laporan-masyarakat",
    "/laporan-sppg",
    "/laporan-sppg/:path*",
    "/profil",
    "/tambah-laporan",
  ],
};
