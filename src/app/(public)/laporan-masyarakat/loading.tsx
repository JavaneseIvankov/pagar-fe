import { PublicReportListSkeleton } from "@/components/reports/public-report-list-skeleton";
import { ReportTabs } from "@/components/reports/report-tabs";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-10">
      <ReportTabs />
      <PublicReportListSkeleton />
    </div>
  );
}
