import { ReportTabs } from "@/components/reports/report-tabs";
import { SppgReportContainer } from "@/containers/sppg-report-container";

export default function SppgReportPage() {
  return (
    <div className="flex flex-col gap-10 items-center">
      <ReportTabs />
      <SppgReportContainer />
    </div>
  );
}
