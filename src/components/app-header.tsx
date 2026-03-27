"use client";

import { Add01Icon, Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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

  const navButtonClassName =
    "size-10 justify-center rounded-full border border-transparent px-0 text-muted-foreground transition-[background-color,color,border-color] hover:border-border/70 hover:bg-white/80 hover:text-foreground xl:h-10 xl:w-auto xl:px-4";

  return (
    <header className="sticky top-0 z-30 w-full border-border/60 border-b bg-card backdrop-blur">
      <div className="container flex flex-col gap-3 py-3 sm:min-h-18 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-3 sm:shrink-0">
          <AppLogo className="block h-12 sm:hidden md:block" variant="full" />
          <AppLogo
            className="hidden h-12 sm:block md:hidden"
            variant="symbol"
          />
          <div className="ml-auto flex items-center gap-1.5 sm:hidden">
            <HeaderActions navButtonClassName={navButtonClassName} />
          </div>
        </div>

        {showBrandAndSearch ? (
          <SearchReport className="mx-auto w-full min-w-0 sm:max-w-[640px] sm:flex-1 sm:basis-0" />
        ) : (
          <div className="hidden sm:block sm:flex-1" aria-hidden />
        )}

        <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
          <HeaderActions navButtonClassName={navButtonClassName} />
        </div>
      </div>
    </header>
  );
}

interface HeaderActionsProps {
  navButtonClassName: string;
}

function HeaderActions({ navButtonClassName }: HeaderActionsProps) {
  return (
    <>
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: cn("gap-2", navButtonClassName),
        })}
        href={"/"}
        title="Beranda"
        aria-label="Beranda"
      >
        <HugeiconsIcon icon={Home01Icon} aria-hidden="true" />
        <span className="hidden xl:inline">Beranda</span>
      </Link>
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: cn("gap-2", navButtonClassName),
        })}
        href={"/create-report"}
        title="Tambah laporan"
        aria-label="Tambah laporan"
      >
        <HugeiconsIcon icon={Add01Icon} aria-hidden="true" />
        <span className="hidden xl:inline">Tambah Laporan</span>
      </Link>
      <ProfileButton username="user" email="user@email.com" />
    </>
  );
}
