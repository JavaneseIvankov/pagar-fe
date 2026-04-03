"use client";

import { toast } from "sonner";
import { AdminComplaintsOverview } from "@/components/dashboard/admin-complaints-overview";
import { AdminComplaintsTable } from "@/components/dashboard/admin-complaints-table";
import { AdminDashboardSkeleton } from "@/components/dashboard/admin-dashboard-skeleton";
import {
  type AdminSummaryStatItem,
  AdminSummaryStats,
} from "@/components/dashboard/admin-summary-stats";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import {
  PeopleIcon,
  ReportIcon,
  SchoolIcon,
  TruckIcon,
} from "@/components/exported-icons";
import {
  useAdminDashboard,
  useUpdateAdminComplaintStatus,
} from "@/hooks/use-admin-dashboard";
import { getAdminComplaintStatusUi } from "@/lib/ui-mappers";
import type { TAdminStatistics } from "@/types";

function mapSummaryStats(statistics: TAdminStatistics): AdminSummaryStatItem[] {
  return [
    {
      // icon: <HugeiconsIcon icon={ChartHistogramIcon} size={20} />,
      icon: <ReportIcon className="size-6" />,
      iconClassName: "bg-orange-100 text-orange-600",
      badgeText: "LAPORAN",
      badgeClassName: "bg-orange-50 text-orange-600 hover:bg-orange-50",
      title: "Total Laporan SPPG",
      value: statistics.reports.total.toLocaleString(),
    },
    {
      // icon: <HugeiconsIcon icon={TruckIcon} size={20} />,
      icon: <TruckIcon className="size-6" />,
      iconClassName: "bg-sky-100 text-sky-600",
      badgeText: "SPPG",
      badgeClassName: "bg-sky-50 text-sky-600 hover:bg-sky-50",
      title: "Total Pengguna SPPG",
      value: `${statistics.sppg.total} Vendor`,
    },
    {
      icon: <SchoolIcon className="size-6" />,
      iconClassName: "bg-emerald-100 text-emerald-600",
      badgeText: "SEKOLAH",
      badgeClassName: "bg-emerald-50 text-emerald-600 hover:bg-emerald-50",
      title: "Total Pengguna Sekolah",
      value: `${statistics.school.total} Sekolah`,
    },
    {
      icon: <PeopleIcon className="size-6" />,
      iconClassName: "bg-purple-100 text-purple-600",
      badgeText: "UMUM",
      badgeClassName: "bg-purple-50 text-purple-600 hover:bg-purple-50",
      title: "Total Pengguna Umum",
      value: statistics.public.total.toLocaleString(),
    },
  ];
}

export function AdminDashboardContainer() {
  const { data, isLoading, isError } = useAdminDashboard();
  const updateComplaintStatusMutation = useUpdateAdminComplaintStatus();

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="py-8 text-destructive">Gagal memuat dashboard admin.</div>
    );
  }

  const summaryStats = mapSummaryStats(data.statistics);
  const complaints = data.complaints.map((complaint) => ({
    ...complaint,
    statusUi: getAdminComplaintStatusUi(complaint.status),
  }));
  const updatingComplaintId = updateComplaintStatusMutation.isPending
    ? (updateComplaintStatusMutation.variables?.id ?? null)
    : null;

  const totalReviews = data.statistics.reviews.total || 1;
  const schoolPercent = Math.round(
    (data.statistics.reviews.school / totalReviews) * 100,
  );
  const publicPercent = Math.round(
    (data.statistics.reviews.public / totalReviews) * 100,
  );

  return (
    <div className="mx-auto flex w-full flex-col gap-8">
      <DashboardPageHeader>
        <DashboardPageHeader.Title>
          Panel Monitoring Pusat
        </DashboardPageHeader.Title>
        <DashboardPageHeader.Description>
          Pantau real-time transparansi gizi dan realisasi anggaran publik
        </DashboardPageHeader.Description>
      </DashboardPageHeader>

      <AdminSummaryStats stats={summaryStats} />

      <AdminComplaintsTable
        complaints={complaints}
        onUpdateStatus={async ({ id, status }) => {
          try {
            const result = await updateComplaintStatusMutation.mutateAsync({
              id,
              status,
            });
            toast.success(result.message);
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Gagal memperbarui status keluhan.",
            );
            throw error;
          }
        }}
        updatingComplaintId={updatingComplaintId}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <AdminComplaintsOverview
          total={data.statistics.reviews.total}
          schoolPercent={schoolPercent}
          publicPercent={publicPercent}
        />
      </div>
    </div>
  );
}
