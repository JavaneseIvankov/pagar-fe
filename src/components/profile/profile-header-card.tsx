import { Card, CardContent } from "@/components/ui/card";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
      <CardContent className="flex items-center gap-8 p-8">
        <div className="flex aspect-square h-36 w-36 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/50 bg-[#e8f5ef] text-[#0eb363]">
          <div className="grid h-20 w-20 -rotate-45 grid-cols-2 gap-0.5 p-2">
            <div className="h-full w-full rounded-full border-[5px] border-current" />
            <div className="h-full w-full rounded-full border-[5px] border-current" />
            <div className="h-full w-full rounded-full border-[5px] border-current" />
            <div className="h-full w-full rounded-full border-[5px] border-current" />
          </div>
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
