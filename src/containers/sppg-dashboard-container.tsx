import { PublicReportsList } from "@/components/dashboard/public-reports-list";
import { ReportHistoryTable } from "@/components/dashboard/report-history-table";
import { SummaryCard } from "@/components/dashboard/summary-card";
import {
  CheckCircleIcon,
  HeartIcon,
  MoneyIcon,
  ReportIcon,
} from "@/components/exported-icons";
import { publicReviews, sppgReports, sppgStatistics, sppgs } from "@/mock-data";
import type { TSppgStatistics } from "@/types";

const mapSummaryMetrics = (statistics: TSppgStatistics) => [
  {
    id: "metric-1",
    title: "Status Hari Ini",
    value: statistics.isDailyReportSubmitted
      ? "Laporan Terkirim"
      : "Belum Terkirim",
    badgeText: statistics.isDailyReportSubmitted ? "SELESAI" : "BELUM",
    icon: <CheckCircleIcon />,
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
    icon: <HeartIcon />,
    iconClassName: "bg-blue-100 text-blue-500",
    badgeClassName: "bg-blue-50 text-blue-500 hover:bg-blue-50",
  },
  {
    id: "metric-3",
    title: "Sisa Anggaran Bulanan",
    value: new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(statistics.budget.monthly.remaining),
    badgeText: statistics.budget.monthly.status === "SAFE" ? "AMAN" : "BAHAYA",
    icon: <MoneyIcon />,
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
    icon: <ReportIcon />,
    iconClassName: "bg-purple-100 text-purple-600",
    badgeClassName: "bg-purple-50 text-purple-600 hover:bg-purple-50",
  },
];

export function SppgDashboardContainer() {
  const SUMMARY_METRICS = mapSummaryMetrics(sppgStatistics);

  // FIXME: extract this into util later
  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // FIXME: Replace with actual current user from auth context later
  const currentUser = sppgs[0];

  return (
    <div className="mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <h2 className="text-[28px] font-bold tracking-tight text-foreground">
          Selamat Datang! {currentUser.sppgName}!
        </h2>
        <p className="mt-1 text-muted-foreground">
          Berikut adalah ringkasan pengelolaan makanan hari ini, {currentDate}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {SUMMARY_METRICS.map((metric) => (
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
      <ReportHistoryTable reports={sppgReports} />

      {/* Laporan Masyarakat */}
      <PublicReportsList reports={publicReviews} />
    </div>
  );
}
