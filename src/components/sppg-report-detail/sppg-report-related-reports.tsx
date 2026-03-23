import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { TSppgReport } from "@/types";

export interface SppgReportRelatedReportsProps {
  reports: TSppgReport[];
}

export function SppgReportRelatedReports({
  reports,
}: SppgReportRelatedReportsProps) {
  return (
    <div className="mt-2 flex flex-col gap-3">
      <h3 className="mb-1 font-bold text-base">Laporan Terkait</h3>
      {reports.map((report) => (
        <Card
          key={report.id}
          className="w-full cursor-pointer rounded-xl border-2 border-foreground/10 p-3.5 shadow-none transition-colors hover:border-foreground/20 hover:bg-slate-50/50"
        >
          <div className="flex h-full items-center gap-4">
            <div className="relative h-[70px] w-[70px] flex-shrink-0 overflow-hidden rounded-lg border border-border/5 bg-slate-100">
              <Image
                src={report.imageUrl}
                alt={report.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex h-full w-full flex-col justify-center">
              <div className="mb-1 font-bold text-[10px] text-green-500 uppercase tracking-wider">
                {report.mealTime}
              </div>
              <div className="mb-1 line-clamp-1 font-bold text-foreground text-sm leading-tight">
                {report.title}
              </div>
              <div className="font-medium text-muted-foreground text-xs">
                Rp 15.000
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
