import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent } from "@/components/ui/card";
import type { TSppgProfile } from "@/types";
import { FlowerIcon } from "../exported-icons";

export interface ProfileHeaderCardProps {
  profile: Pick<TSppgProfile, "description" | "location" | "sppgName">;
}

export function ProfileHeaderCard({ profile }: ProfileHeaderCardProps) {
  return (
    <Card className="border-0 shadow-sm ring-0">
      <CardContent className="flex flex-col items-center gap-8 p-8 md:flex-row">
        <div className="flex aspect-square h-36 w-36 items-center justify-center rounded-2xl border border-emerald-100/50 bg-[#e8f5ef] text-[#0eb363]">
          <FlowerIcon />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-3xl">{profile.sppgName}</h2>
          <p className="mt-1 max-w-3xl text-muted-foreground text-sm leading-relaxed">
            {profile.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-muted-foreground text-sm">
            <HugeiconsIcon icon={Location01Icon} size={18} />
            <span>{profile.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
