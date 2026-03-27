import { ReportTabs } from "@/components/reports/report-tabs";
import { PublicReportContainer } from "@/containers/public-report-container";

export default function PublicReportPage() {
  return (
    <div className="flex flex-col items-center gap-10">
      <ReportTabs />
      <PublicReportContainer />
    </div>
  );
}
