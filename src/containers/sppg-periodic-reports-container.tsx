"use client";

import { useState } from "react";
import { SppgPeriodicReportsSkeleton } from "@/components/dashboard/sppg/sppg-periodic-reports-skeleton";
import { PeriodicReportTable } from "@/components/dashboard/sppg/periodic-report-table";
import { useSppgPeriodicReports } from "@/hooks/use-sppg-periodic-reports";

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

export function SppgPeriodicReportsContainer() {
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_MONTH);
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const period = createMonthlyDateRange(selectedMonth, selectedYear);
  const { data, isLoading, isError } = useSppgPeriodicReports(period);

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
        monthOptions={PERIOD_OPTIONS}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        yearOptions={YEAR_OPTIONS}
      />
    </div>
  );
}
