import Link from "next/link";
import { SpeakerIcon } from "@/components/exported-icons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SppgReportDiscrepancyCardProps {
  sppgId: string;
}

export function SppgReportDiscrepancyCard({
  sppgId,
}: SppgReportDiscrepancyCardProps) {
  return (
    <Card className="mt-2 mb-2 flex w-full flex-col items-center gap-4 rounded-xl border-0 bg-foreground p-6 text-center text-background shadow-none">
      <div className="mt-2 text-primary">
        <SpeakerIcon className="h-8 w-8" />
      </div>
      <div className="mb-2 space-y-1.5">
        <h3 className="font-bold text-base leading-tight">
          Temukan Ketidaksesuaian?
        </h3>
        <p className="px-2 text-muted text-xs leading-relaxed">
          Laporkan jika gizi atau porsi tidak sesuai dengan yang tertera di
          platform ini
        </p>
      </div>
      <Link
        href={{
          pathname: "/tambah-laporan",
          query: {
            sppgId,
          },
        }}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-10 w-full max-w-[200px] rounded-lg border-transparent bg-background font-extrabold text-foreground text-sm hover:bg-primary hover:text-primary-foreground",
        )}
      >
        Laporkan
      </Link>
    </Card>
  );
}
