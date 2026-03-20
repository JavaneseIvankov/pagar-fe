"use client";

import { FileVerifiedIcon, People } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
This component state is tied to pathanme
*/
export function ReportTabs() {
  const pathname = usePathname();

  return (
    <Tabs defaultValue="/public-report" value={pathname}>
      <TabsList>
        <TabsTrigger value="/public-report" className="flex gap-2">
          <Link href="/public-report">
            <HugeiconsIcon icon={People} size={14} />
            Laporan Masyarakat
          </Link>
        </TabsTrigger>

        <TabsTrigger value="/sppg-report" className="flex gap-2">
          <Link href="/sppg-report">
            <HugeiconsIcon icon={FileVerifiedIcon} size={14} />
            Laporan SPPG
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
