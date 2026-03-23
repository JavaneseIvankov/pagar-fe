"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppLogo } from "./app-logo";
import ProfileButton from "./profile/profile-button";
import { SearchReport } from "./reports/search-report";
import { buttonVariants } from "./ui/button";

export function AppHeader() {
  const pathname = usePathname();
  const showBrandAndSearch =
    pathname === "/public-report" || pathname === "/sppg-report";

  return (
    <header className="w-full bg-card">
      <div
        className={cn(
          "container flex min-h-16 items-center gap-2",
          showBrandAndSearch ? "justify-start" : "justify-between",
        )}
      >
        <AppLogo className="h-18 pr-2 py-2" />
        {showBrandAndSearch && <SearchReport />}
        <div className="flex gap-2 items-center">
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href={"/create-report"}
          >
            Beranda
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href={"/"}>
            Tambah Laporan
          </Link>
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
