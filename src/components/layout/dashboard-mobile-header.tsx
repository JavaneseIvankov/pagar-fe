"use client";

import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getAuthenticatedLandingPath } from "@/lib/auth";
import type { TAuthSession, TRole } from "@/types";

function getRoleLabel(role: TRole) {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "PUBLIC":
      return "Publik";
    case "SCHOOL":
      return "Sekolah";
    case "SPPG":
      return "SPPG";
  }
}

export function DashboardMobileHeader({
  session,
}: {
  session: TAuthSession | null;
}) {
  const contextLabel = session ? getRoleLabel(session.user.role) : "Dashboard";
  const homeHref = session
    ? getAuthenticatedLandingPath(session.user.role)
    : "/dashboard";

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <Link
            href={homeHref}
            className="flex min-w-0 items-center gap-3"
            aria-label="Buka dashboard"
          >
            <AppLogo variant="symbol" className="h-8 w-auto shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold text-sm leading-none">Pagar</p>
              <p className="truncate text-muted-foreground text-xs">
                {contextLabel}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
