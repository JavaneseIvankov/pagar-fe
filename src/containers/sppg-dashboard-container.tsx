"use client";

import { PublicReportsList } from "@/components/dashboard/public-reports-list";
import { ReportHistoryTable } from "@/components/dashboard/report-history-table";
import { SppgDashboardSkeleton } from "@/components/dashboard/sppg-dashboard-skeleton";
import { SummaryCard } from "@/components/dashboard/summary-card";
import {
  CheckCircleIcon,
  HeartIcon,
  MoneyIcon,
  ReportIcon,
} from "@/components/exported-icons";
import { useSppgDashboard } from "@/hooks/use-sppg-dashboard";
import { formatCurrencyIdr, formatLongDate } from "@/lib/formatters";
import type { TSppgStatistics } from "@/types";

const mapSummaryMetrics = (statistics: TSppgStatistics) => [
  {
    id: "metric-1",
    title: "Status Hari Ini",
    value: statistics.isDailyReportSubmitted
      ? "Laporan Terkirim"
      : "Belum Terkirim",
    badgeText: statistics.isDailyReportSubmitted ? "SELESAI" : "BELUM",
    icon: <CheckCircleIcon className="size-6" />,
    iconClassName: statistics.isDailyReportSubmitted
      ? "bg-emerald-100 text-emerald-600"
      : "bg-red-100 text-red-600",
    badgeClassName: statistics.isDailyReportSubmitted
      ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
      : "bg-red-50 text-red-600 hover:bg-red-50",
  },
  {
    id: "metric-2",
    title: "Rata-rata Kalori (Minggu ini)",
    value: `${statistics.weeklyCalories.average} kkal`,
    badgeText: `${statistics.weeklyCalories.percentFromLastWeek > 0 ? "+" : ""}${statistics.weeklyCalories.percentFromLastWeek}%`,
    icon: <HeartIcon className="size-6" />,
    iconClassName: "bg-blue-100 text-blue-500",
    badgeClassName: "bg-blue-50 text-blue-500 hover:bg-blue-50",
  },
  {
    id: "metric-3",
    title: "Sisa Anggaran Bulanan",
    value: formatCurrencyIdr(statistics.budget.monthly.remaining),
    badgeText: statistics.budget.monthly.status === "SAFE" ? "AMAN" : "BAHAYA",
    icon: <MoneyIcon className="size-6" />,
    iconClassName:
      statistics.budget.monthly.status === "SAFE"
        ? "bg-orange-100 text-orange-500"
        : "bg-red-100 text-red-500",
    badgeClassName:
      statistics.budget.monthly.status === "SAFE"
        ? "bg-orange-50 text-orange-500 hover:bg-orange-50"
        : "bg-red-50 text-red-500 hover:bg-red-50",
  },
  {
    id: "metric-4",
    title: "Laporan Masyarakat",
    value: `${statistics.publicReviews.total} Laporan`,
    badgeText: "MASUK",
    icon: <ReportIcon className="size-6" />,
    iconClassName: "bg-purple-100 text-purple-600",
    badgeClassName: "bg-purple-50 text-purple-600 hover:bg-purple-50",
  },
];

export function SppgDashboardContainer() {
  const { data, isLoading, isError } = useSppgDashboard();

  if (isLoading) {
    return <SppgDashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="py-8 text-destructive">Gagal memuat dashboard SPPG.</div>
    );
  }

  const summaryMetrics = mapSummaryMetrics(data.statistics);
  const currentDate = formatLongDate(new Date());

  // FIXME: fix this text-sizing, use design system instead of absolute value

  return (
    <div className="page-enter flex flex-col gap-6 sm:gap-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h2 className="text-balance font-bold text-2xl text-foreground tracking-tight sm:text-[28px] lg:text-[32px]">
          Selamat Datang! {data.sppgName}!
        </h2>
        <p className="mt-2 text-pretty text-muted-foreground">
          Berikut adalah ringkasan pengelolaan makanan hari ini, {currentDate}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <SummaryCard
            key={metric.id}
            icon={metric.icon}
            iconClassName={metric.iconClassName}
            badgeText={metric.badgeText}
            badgeClassName={metric.badgeClassName}
            title={metric.title}
            value={metric.value}
          />
        ))}
      </div>

      {/* Riwayat Laporan */}
      <div className="page-enter page-enter-delay-1">
        <ReportHistoryTable reports={data.recentReports} />
      </div>

      {/* Laporan Masyarakat */}
      <div className="page-enter page-enter-delay-2">
        <PublicReportsList reports={data.publicReviews} />
      </div>
    </div>
  );
}
