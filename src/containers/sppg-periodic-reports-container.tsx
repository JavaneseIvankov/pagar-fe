"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SppgPeriodicReportsSkeleton } from "@/components/dashboard/sppg/sppg-periodic-reports-skeleton";
import { PeriodicReportTable } from "@/components/dashboard/sppg/periodic-report-table";
import { useSppgPeriodicReports } from "@/hooks/use-sppg-periodic-reports";
import type { TSppgPeriodicReport } from "@/types";

const PERIOD_OPTIONS = [
  { label: "Januari", value: "01" },
  { label: "Februari", value: "02" },
  { label: "Maret", value: "03" },
  { label: "April", value: "04" },
  { label: "Mei", value: "05" },
  { label: "Juni", value: "06" },
  { label: "Juli", value: "07" },
  { label: "Agustus", value: "08" },
  { label: "September", value: "09" },
  { label: "Oktober", value: "10" },
  { label: "November", value: "11" },
  { label: "Desember", value: "12" },
] as const;

const CURRENT_DATE = new Date();
const DEFAULT_MONTH = String(CURRENT_DATE.getMonth() + 1).padStart(2, "0");
const DEFAULT_YEAR = String(CURRENT_DATE.getFullYear());
const YEAR_OPTIONS = Array.from({ length: 3 }, (_, index) =>
  String(CURRENT_DATE.getFullYear() - index),
);

function createMonthlyDateRange(month: string, year: string) {
  const monthIndex = Number(month) - 1;
  const yearNumber = Number(year);
  const startDate = new Date(Date.UTC(yearNumber, monthIndex, 1));
  const endDate = new Date(Date.UTC(yearNumber, monthIndex + 1, 0));

  return {
    endDate: endDate.toISOString().slice(0, 10),
    startDate: startDate.toISOString().slice(0, 10),
  };
}

function parseDownloadFilename(contentDisposition: string | null) {
  if (!contentDisposition) {
    return null;
  }

  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(contentDisposition);

  if (utf8Match) {
    return decodeURIComponent(utf8Match[1]);
  }

  const filenameMatch = /filename="?([^"]+)"?/i.exec(contentDisposition);

  return filenameMatch ? filenameMatch[1] : null;
}

export function SppgPeriodicReportsContainer() {
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_MONTH);
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [downloadingReportId, setDownloadingReportId] = useState<null | string>(
    null,
  );
  const period = createMonthlyDateRange(selectedMonth, selectedYear);
  const { data, isLoading, isError } = useSppgPeriodicReports(period);

  const handleDownload = async (report: TSppgPeriodicReport) => {
    setDownloadingReportId(report.id);

    try {
      const searchParams = new URLSearchParams({
        start_date: period.startDate,
        end_date: period.endDate,
        format: "pdf",
      });
      const response = await fetch(
        `/dashboard/sppg/laporan-periodik/export?${searchParams.toString()}`,
      );

      if (!response.ok) {
        const message =
          (await response.text()) || "Gagal mengunduh laporan periodik.";
        throw new Error(message);
      }

      const blob = await response.blob();
      const filename =
        parseDownloadFilename(response.headers.get("content-disposition")) ??
        `laporan-periodik-${selectedYear}-${selectedMonth}.pdf`;
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = downloadUrl;
      anchor.download = filename;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);
      toast.success(`Rekap ${report.periode} berhasil diunduh.`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal mengunduh laporan periodik.",
      );
    } finally {
      setDownloadingReportId(null);
    }
  };

  if (isLoading) {
    return <SppgPeriodicReportsSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="py-8 text-destructive">
        Gagal memuat laporan periodik.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl tracking-tight">Laporan Periodik</h1>
        <p className="text-muted-foreground">
          Rekap laporan rincian menu dan anggaran
        </p>
      </div>
      <PeriodicReportTable
        data={data}
        downloadingReportId={downloadingReportId}
        monthOptions={PERIOD_OPTIONS}
        onDownload={handleDownload}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        yearOptions={YEAR_OPTIONS}
      />
    </div>
  );
}
