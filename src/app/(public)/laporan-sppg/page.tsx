import { ReportTabs } from "@/components/reports/report-tabs";
import { SppgReportContainer } from "@/containers/sppg-report-container";

export default function SppgReportPage() {
  return (
    <div className="flex flex-col items-center gap-10">
      <ReportTabs />
      <SppgReportContainer />
    </div>
  );
}
