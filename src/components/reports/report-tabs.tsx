"use client";

import { FileVerifiedIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { PeopleIcon } from "../exported-icons";

/**
This component state is tied to pathanme
*/
export function ReportTabs({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <Tabs
      defaultValue="/public-report"
      value={pathname}
      className={cn("", className)}
    >
      <TabsList className="grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-white/70 p-1">
        <TabsTrigger
          value="/public-report"
          className="min-w-0 rounded-xl px-3 py-2.5 text-xs sm:text-sm"
        >
          <Link
            href="/public-report"
            className="flex min-w-0 items-center justify-center gap-2 text-center"
          >
            <PeopleIcon />
            <span className="truncate">Laporan Masyarakat</span>
          </Link>
        </TabsTrigger>

        <TabsTrigger
          value="/sppg-report"
          className="min-w-0 rounded-xl px-3 py-2.5 text-xs sm:text-sm"
        >
          <Link
            href="/sppg-report"
            className="flex min-w-0 items-center justify-center gap-2 text-center"
          >
            <HugeiconsIcon
              icon={FileVerifiedIcon}
              size={14}
              aria-hidden="true"
            />
            <span className="truncate">Laporan SPPG</span>
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
