"use client";

import { FileVerifiedIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOTION_TRANSITIONS } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";
import { PeopleIcon } from "../exported-icons";

/**
This component state is tied to pathanme
*/
export function ReportTabs({ className }: { className?: string }) {
  const pathname = usePathname();
  const activeTab =
    pathname === "/laporan-sppg" ? "/laporan-sppg" : "/laporan-masyarakat";

  return (
    <Tabs
      defaultValue="/laporan-masyarakat"
      value={activeTab}
      className={cn("", className)}
    >
      <TabsList className="relative grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-white/70 p-1">
        <TabsTrigger
          value="/laporan-masyarakat"
          className="relative z-10 min-w-0 rounded-xl px-3 py-2.5 text-xs sm:text-sm"
        >
          {activeTab === "/laporan-masyarakat" ? (
            <motion.span
              layoutId="report-tab-active-pill"
              className="absolute inset-0 -z-10 rounded-xl bg-tabs-primary"
              transition={MOTION_TRANSITIONS.fastOut}
            />
          ) : null}
          <Link
            href="/laporan-masyarakat"
            className="flex min-w-0 items-center justify-center gap-2 text-center"
          >
            <PeopleIcon />
            <span className="truncate">Laporan Masyarakat</span>
          </Link>
        </TabsTrigger>

        <TabsTrigger
          value="/laporan-sppg"
          className="relative z-10 min-w-0 rounded-xl px-3 py-2.5 text-xs sm:text-sm"
        >
          {activeTab === "/laporan-sppg" ? (
            <motion.span
              layoutId="report-tab-active-pill"
              className="absolute inset-0 -z-10 rounded-xl bg-tabs-primary"
              transition={MOTION_TRANSITIONS.fastOut}
            />
          ) : null}
          <Link
            href="/laporan-sppg"
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
