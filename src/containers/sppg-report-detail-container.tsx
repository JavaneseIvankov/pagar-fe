import { notFound } from "next/navigation";
import { SppgReportBudgetCard } from "@/components/sppg-report-detail/sppg-report-budget-card";
import { SppgReportDetailLayout } from "@/components/sppg-report-detail/sppg-report-detail-layout";
import { SppgReportDiscrepancyCard } from "@/components/sppg-report-detail/sppg-report-discrepancy-card";
import { SppgReportHero } from "@/components/sppg-report-detail/sppg-report-hero";
import { SppgReportNutritionCard } from "@/components/sppg-report-detail/sppg-report-nutrition-card";
import { SppgReportRelatedReports } from "@/components/sppg-report-detail/sppg-report-related-reports";
import { SppgReportVendorCard } from "@/components/sppg-report-detail/sppg-report-vendor-card";
import { sppgReportDetails } from "@/mock-data";

export interface SppgReportDetailContainerProps {
  id: string;
}

export function SppgReportDetailContainer({
  id,
}: SppgReportDetailContainerProps) {
  const report = sppgReportDetails.find((item) => item.id === id);

  if (!report) {
    notFound();
  }

  return (
    <SppgReportDetailLayout
      title={report.title}
      hero={<SppgReportHero title={report.title} imageUrl={report.imageUrl} />}
      nutrition={
        <SppgReportNutritionCard nutritionalFacts={report.nutritionalFacts} />
      }
      budget={
        report.budget ? <SppgReportBudgetCard budget={report.budget} /> : null
      }
      vendor={<SppgReportVendorCard vendor={report.author} />}
      related={
        report.relatedReports.length > 0 ? (
          <SppgReportRelatedReports reports={report.relatedReports} />
        ) : null
      }
      discrepancy={<SppgReportDiscrepancyCard />}
    />
  );
}
