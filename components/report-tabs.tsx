import { FileVerifiedIcon, People } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ReportTabs() {
  return (
    <Tabs defaultValue="1">
      <TabsList>
        <TabsTrigger value="1" className="flex gap-2">
          <HugeiconsIcon icon={People} size={14} />
          Laporan Masyarakat
        </TabsTrigger>

        <TabsTrigger value="2" className="flex gap-2">
          <HugeiconsIcon icon={FileVerifiedIcon} size={14} />
          Laporan SPPG
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
