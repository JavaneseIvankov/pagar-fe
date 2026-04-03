import { UserGroupIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminAccessDetailUi } from "@/lib/ui-mappers";

export interface AdminAccessDetailsCardProps {
  accessDetails: AdminAccessDetailUi[];
}

export function AdminAccessDetailsCard({
  accessDetails,
}: AdminAccessDetailsCardProps) {
  return (
    <Card className="flex h-full flex-col border-0 shadow-sm ring-0">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="flex items-center gap-3 font-bold text-lg">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <HugeiconsIcon icon={UserGroupIcon} size={18} />
          </div>
          Detail Akses
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 p-6 pt-2">
        {accessDetails.map((detail) => (
          <div
            key={detail.id}
            className="flex items-center gap-4 rounded-xl bg-primary/10 p-4 font-semibold text-foreground text-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HugeiconsIcon icon={detail.icon} size={20} />
            </div>
            {detail.label}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
