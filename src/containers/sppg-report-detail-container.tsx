"use client";

import { SppgReportAttachmentsCard } from "@/components/sppg-report-detail/sppg-report-attachments-card";
import { SppgReportDetailLayout } from "@/components/sppg-report-detail/sppg-report-detail-layout";
import { SppgReportDetailSkeleton } from "@/components/sppg-report-detail/sppg-report-detail-skeleton";
import { SppgReportDiscrepancyCard } from "@/components/sppg-report-detail/sppg-report-discrepancy-card";
import { SppgReportHero } from "@/components/sppg-report-detail/sppg-report-hero";
import { SppgReportNutritionCard } from "@/components/sppg-report-detail/sppg-report-nutrition-card";
import { SppgReportRelatedReports } from "@/components/sppg-report-detail/sppg-report-related-reports";
import { SppgReportVendorCard } from "@/components/sppg-report-detail/sppg-report-vendor-card";
import { useSppgReportDetail } from "@/hooks/use-sppg-report-detail";

export interface SppgReportDetailContainerProps {
  id: string;
}

export function SppgReportDetailContainer({
  id,
}: SppgReportDetailContainerProps) {
  const { data: report, isLoading, isError } = useSppgReportDetail(id);

  if (isLoading) {
    return <SppgReportDetailSkeleton />;
  }

  if (isError || !report) {
    return (
      <div className="py-8 text-destructive">Gagal memuat detail laporan.</div>
    );
  }

  return (
    <SppgReportDetailLayout
      title={report.title}
      hero={<SppgReportHero title={report.title} imageUrl={report.imageUrl} />}
      nutrition={
        <SppgReportNutritionCard nutritionalFacts={report.nutritionalFacts} />
      }
      budget={
        // TODO: actually display budget card once backend actually sends enough data.
        null
        // report.budget ? <SppgReportBudgetCard budget={report.budget} /> : null
      }
      attachments={
        report.budget?.attachments?.length > 0 ? (
          <SppgReportAttachmentsCard attachments={report.budget.attachments} />
        ) : null
      }
      vendor={<SppgReportVendorCard vendor={report.author} />}
      related={
        report.relatedReports.length > 0 ? (
          <SppgReportRelatedReports reports={report.relatedReports} />
        ) : null
      }
      discrepancy={<SppgReportDiscrepancyCard sppgId={report.author.sppgId} />}
    />
  );
}
