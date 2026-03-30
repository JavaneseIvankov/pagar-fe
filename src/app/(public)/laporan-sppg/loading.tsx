import { ReportTabs } from "@/components/reports/report-tabs";
import { SppgReportListSkeleton } from "@/components/reports/sppg-report-list-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-10">
      <ReportTabs />
      <SppgReportListSkeleton />
    </div>
  );
}
