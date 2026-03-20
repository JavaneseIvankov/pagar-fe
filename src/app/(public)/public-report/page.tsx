import { ReportTabs } from "@/components/reports/report-tabs";
import { PublicReportContainer } from "@/containers/public-report-container";

export default function PublicReportPage() {
  return (
    <div className="flex flex-col gap-10 items-center">
      <ReportTabs />
      <PublicReportContainer />
    </div>
  );
}
