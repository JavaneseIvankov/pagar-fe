"use client";

import { Add01Icon, Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "./app-logo";
import ProfileButton from "./profile/profile-button";
import { SearchReport } from "./reports/search-report";
import { buttonVariants } from "./ui/button";

const SEARCH_ENABLED_ROUTES = ["/public-report", "/sppg-report"];

export function AppHeader() {
  const pathname = usePathname();
  const showBrandAndSearch = SEARCH_ENABLED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <header className="w-full bg-card">
      <div className="container flex min-h-16 items-center gap-4">
        <AppLogo className="h-18 pr-2 xl:p-2" />

        {showBrandAndSearch ? (
          <SearchReport className="mx-auto max-w-[517px]" />
        ) : (
          <div className="spacer w-full" aria-hidden />
        )}

        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "gap-2 px-2 md:px-4",
            })}
            href={"/"}
            title="Beranda"
          >
            <HugeiconsIcon icon={Home01Icon} className="md:hidden" />
            <span className="hidden md:inline">Beranda</span>
          </Link>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "gap-2 px-2 md:px-4",
            })}
            href={"/create-report"}
            title="Tambah Laporan"
          >
            <HugeiconsIcon icon={Add01Icon} className="md:hidden" />
            <span className="hidden md:inline">Tambah Laporan</span>
          </Link>
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
