import { UserGroupIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface AccessDetailItem {
  label: string;
  icon: IconSvgElement;
}

export interface AdminAccessDetailsCardProps {
  accessDetails: AccessDetailItem[];
}

export function AdminAccessDetailsCard({
  accessDetails,
}: AdminAccessDetailsCardProps) {
  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="flex items-center gap-3 font-bold text-lg">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#0eb363] text-white">
            <HugeiconsIcon icon={UserGroupIcon} size={18} />
          </div>
          Detail Akses
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 p-6 pt-2">
        {accessDetails.map((detail, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: stable index
            key={index}
            className="flex items-center gap-4 rounded-xl bg-[#e8f5ef] p-4 font-semibold text-foreground text-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#0eb363] text-white">
              <HugeiconsIcon icon={detail.icon} size={20} />
            </div>
            {detail.label}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
