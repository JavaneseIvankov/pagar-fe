import { SppgReportCard } from "@/components/reports/sppg-report-card";
import { sppgReports } from "../mock-data";

export function SppgReportContainer() {
  const report = sppgReports[0];

  // TASK: implement infinite scroll here (later after backend contract and frontend domain types are stable)
  return <SppgReportCard report={report} />;
}
