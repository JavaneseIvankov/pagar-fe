import { Card, CardContent } from "@/components/ui/card";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FlowerIcon } from "../exported-icons";

export interface ProfileHeaderCardProps {
  name: string;
  description: string;
  location: string;
}

export function ProfileHeaderCard({
  name,
  description,
  location,
}: ProfileHeaderCardProps) {
  return (
    <Card className="border-0 shadow-sm ring-0">
      <CardContent className="flex flex-col items-center gap-8 p-8 md:flex-row">
        <div className="flex aspect-square h-36 w-36 items-center justify-center rounded-2xl border border-emerald-100/50 bg-[#e8f5ef] text-[#0eb363]">
          <FlowerIcon />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-3xl">{name}</h2>
          <p className="mt-1 max-w-3xl text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-muted-foreground text-sm">
            <HugeiconsIcon icon={Location01Icon} size={18} />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
