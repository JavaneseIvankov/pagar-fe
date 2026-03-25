import {
  Building04Icon,
  ChartHistogramIcon,
  TruckIcon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AdminComplaintsOverview } from "@/components/dashboard/admin-complaints-overview";
import {
  type AdminComplaintStatusUi,
  AdminComplaintsTable,
} from "@/components/dashboard/admin-complaints-table";
import { AdminDashboardHeader } from "@/components/dashboard/admin-dashboard-header";
import {
  type AdminSummaryStatItem,
  AdminSummaryStats,
} from "@/components/dashboard/admin-summary-stats";
import { AdminVendorWarnings } from "@/components/dashboard/admin-vendor-warnings";
import { adminStatistics } from "@/mock-data";

import type { TAdminComplaint, TAdminStatistics } from "@/types";

const MOCK_COMPLAINTS: TAdminComplaint[] = [
  {
    id: "1",
    authorName: "Rasya Fariz",
    title: "Sayuran kurang matang",
    vendorName: "PT. Gizi Nutrisi",
    imageUrl: "/images/food-placeholder.png",
    status: "PENDING",
  },
  {
    id: "2",
    authorName: "SDN 01 Malang",
    title: "Nasi keras & kurang banyak",
    vendorName: "PT. Sehat Bergizi",
    imageUrl: "/images/food-placeholder.png",
    status: "INVESTIGATING",
  },
  {
    id: "3",
    authorName: "Jule",
    title: "Hambar & bumbu tidak meresap",
    vendorName: "PT. Gizi Nutrisi",
    imageUrl: "/images/food-placeholder.png",
    status: "RESOLVED",
  },
];

function getComplaintStatusUi(
  status: TAdminComplaint["status"],
): AdminComplaintStatusUi {
  switch (status) {
    case "PENDING":
      return {
        label: "Menunggu",
        className: "bg-sky-50 text-sky-600 hover:bg-sky-50",
      };
    case "INVESTIGATING":
      return {
        label: "Investigasi",
        className: "bg-orange-50 text-orange-600 hover:bg-orange-50",
      };
    case "RESOLVED":
      return {
        label: "Selesai",
        className: "bg-emerald-50 text-emerald-600 hover:bg-emerald-50",
      };
  }
}

function mapSummaryStats(statistics: TAdminStatistics): AdminSummaryStatItem[] {
  return [
    {
      icon: <HugeiconsIcon icon={ChartHistogramIcon} size={20} />,
      iconClassName: "bg-orange-100 text-orange-600",
      badgeText: "LAPORAN",
      badgeClassName: "bg-orange-50 text-orange-600 hover:bg-orange-50",
      title: "Total Laporan SPPG",
      value: statistics.reports.total.toLocaleString(),
    },
    {
      icon: <HugeiconsIcon icon={TruckIcon} size={20} />,
      iconClassName: "bg-sky-100 text-sky-600",
      badgeText: "SPPG",
      badgeClassName: "bg-sky-50 text-sky-600 hover:bg-sky-50",
      title: "Total Pengguna SPPG",
      value: `${statistics.sppg.total} Vendor`,
    },
    {
      icon: <HugeiconsIcon icon={Building04Icon} size={20} />,
      iconClassName: "bg-emerald-100 text-emerald-600",
      badgeText: "SEKOLAH",
      badgeClassName: "bg-emerald-50 text-emerald-600 hover:bg-emerald-50",
      title: "Total Pengguna Sekolah",
      value: `${statistics.school.total} Sekolah`,
    },
    {
      icon: <HugeiconsIcon icon={UserMultiple02Icon} size={20} />,
      iconClassName: "bg-purple-100 text-purple-600",
      badgeText: "UMUM",
      badgeClassName: "bg-purple-50 text-purple-600 hover:bg-purple-50",
      title: "Total Pengguna Umum",
      value: statistics.public.total.toLocaleString(),
    },
  ];
}

export function AdminDashboardContainer() {
  const summaryStats = mapSummaryStats(adminStatistics);
  const complaints = MOCK_COMPLAINTS.map((complaint) => ({
    ...complaint,
    statusUi: getComplaintStatusUi(complaint.status),
  }));

  const totalReviews = adminStatistics.reviews.total || 1;
  const schoolPercent = Math.round(
    (adminStatistics.reviews.school / totalReviews) * 100,
  );
  const publicPercent = Math.round(
    (adminStatistics.reviews.public / totalReviews) * 100,
  );

  return (
    <div className="mx-auto flex w-full flex-col gap-8">
      <AdminDashboardHeader
        title="Panel Monitoring Pusat"
        description="Pantau real-time transparansi gizi dan realisasi anggaran publik"
      />

      <AdminSummaryStats stats={summaryStats} />

      <AdminComplaintsTable complaints={complaints} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <AdminComplaintsOverview
          total={adminStatistics.reviews.total}
          schoolPercent={schoolPercent}
          publicPercent={publicPercent}
        />
        <AdminVendorWarnings warnings={adminStatistics.sppgWarnings.sppgs} />
      </div>
    </div>
  );
}
