import type { TRole } from "@/types";

function normalizePathname(pathname: string) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getAuthenticatedLandingPath(role: TRole) {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";
    case "SPPG":
      return "/dashboard/sppg";
    case "PUBLIC":
    case "SCHOOL":
      return "/laporan-masyarakat";
  }
}

export function canRoleAccessPath(role: TRole, pathname: string) {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname.startsWith("/dashboard/admin")) {
    return role === "ADMIN";
  }

  if (normalizedPathname.startsWith("/dashboard/sppg")) {
    return role === "SPPG";
  }

  if (
    normalizedPathname.startsWith("/laporan-masyarakat") ||
    normalizedPathname.startsWith("/laporan-sppg") ||
    normalizedPathname.startsWith("/profil") ||
    normalizedPathname.startsWith("/tambah-laporan")
  ) {
    return role === "PUBLIC" || role === "SCHOOL";
  }

  if (normalizedPathname === "/" || normalizedPathname.startsWith("/auth")) {
    return true;
  }

  return true;
}
