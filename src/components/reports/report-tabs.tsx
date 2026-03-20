"use client";

import { FileVerifiedIcon, People } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeopleIcon } from "../exported-icons";

/**
This component state is tied to pathanme
*/
export function ReportTabs({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <Tabs defaultValue="/public-report" value={pathname} className={className}>
      <TabsList>
        <TabsTrigger value="/public-report">
          <Link href="/public-report" className="flex gap-2">
            <PeopleIcon />
            Laporan Masyarakat
          </Link>
        </TabsTrigger>

        <TabsTrigger value="/sppg-report">
          <Link href="/sppg-report" className="flex gap-2">
            <HugeiconsIcon icon={FileVerifiedIcon} size={14} />
            Laporan SPPG
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
