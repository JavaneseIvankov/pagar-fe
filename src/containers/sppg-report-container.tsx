import { SppgReportCard } from "@/components/reports/sppg-report-card";
import { fetchSppgReports } from "@/rpc";

export async function SppgReportContainer() {
  const reports = await fetchSppgReports();

  return (
    <div className="page-enter flex w-full max-w-[933px] flex-col gap-4 sm:gap-6">
      {reports.map((report) => (
        <SppgReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
