"use client";

import { Add01Icon, Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/rpc";
import type { TAuthSession, TRole } from "@/types";
import { AppLogo } from "./app-logo";
import ProfileButton from "./profile/profile-button";
import { SearchReport } from "./reports/search-report";
import { buttonVariants } from "./ui/button";

const SEARCH_ENABLED_ROUTES = ["/laporan-masyarakat", "/laporan-sppg"];

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

function getProfileHref(role: TRole) {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin/profil";
    case "SPPG":
      return "/dashboard/sppg/profil";
    case "PUBLIC":
    case "SCHOOL":
      return "/profil";
  }
}

export function AppHeader({ session }: { session: TAuthSession | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const showBrandAndSearch = SEARCH_ENABLED_ROUTES.some(
    (route) => pathname === route.trim(),
  );
  const canCreateReport =
    !session ||
    session.user.role === "PUBLIC" ||
    session.user.role === "SCHOOL";

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
      router.replace("/auth/masuk");
      router.refresh();
    });
  };

  const navButtonClassName =
    "size-10 justify-center rounded-full border border-transparent px-0 text-muted-foreground transition-[background-color,color,border-color] hover:bg-card  hover:text-foreground xl:h-10 xl:w-auto xl:px-4";

  return (
    <header className="sticky top-0 z-30 w-full border-border/60 border-b bg-card backdrop-blur">
      <div className="container flex flex-col gap-5 py-3 sm:min-h-18 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-3 sm:shrink-0">
          <AppLogo className="block h-12 sm:hidden md:block" variant="full" />
          <AppLogo
            className="hidden h-12 sm:block md:hidden"
            variant="symbol"
          />
          <div className="ml-auto flex items-center gap-1.5 sm:hidden">
            <HeaderActions
              navButtonClassName={navButtonClassName}
              canCreateReport={canCreateReport}
              session={session}
              onLogout={handleLogout}
            />
          </div>
        </div>

        {showBrandAndSearch ? (
          <SearchReport className="mx-auto w-full min-w-0 sm:max-w-[640px] sm:flex-1 sm:basis-0" />
        ) : (
          <div className="hidden sm:block sm:flex-1" aria-hidden />
        )}

        <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
          <HeaderActions
            navButtonClassName={navButtonClassName}
            canCreateReport={canCreateReport}
            session={session}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}

interface HeaderActionsProps {
  canCreateReport: boolean;
  navButtonClassName: string;
  onLogout: () => void;
  session: TAuthSession | null;
}

function HeaderActions({
  canCreateReport,
  navButtonClassName,
  onLogout,
  session,
}: HeaderActionsProps) {
  return (
    <>
      <Link
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: "gap-2",
          }),
          navButtonClassName,
        )}
        href={"/"}
        title="Beranda"
        aria-label="Beranda"
      >
        <HugeiconsIcon icon={Home01Icon} aria-hidden="true" />
        <span className="hidden xl:inline">Beranda</span>
      </Link>
      {canCreateReport ? (
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "gap-2",
            }),
            navButtonClassName,
          )}
          href={"/tambah-laporan"}
          title="Tambah laporan"
          aria-label="Tambah laporan"
        >
          <HugeiconsIcon icon={Add01Icon} aria-hidden="true" />
          <span className="hidden xl:inline">Tambah Laporan</span>
        </Link>
      ) : null}
      {session ? (
        <ProfileButton
          username={session.user.username}
          secondaryText={getRoleLabel(session.user.role)}
          profileHref={getProfileHref(session.user.role)}
          onLogout={onLogout}
        />
      ) : (
        <>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: cn(navButtonClassName, "mr-2 px-4"),
            })}
            href={"/auth/masuk"}
          >
            Masuk
          </Link>
          <Link
            className={buttonVariants({
              className: "h-10 rounded-full px-4",
            })}
            href={"/auth/daftar"}
          >
            Daftar
          </Link>
        </>
      )}
    </>
  );
}
