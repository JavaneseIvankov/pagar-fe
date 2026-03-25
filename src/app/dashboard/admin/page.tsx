import {
  Alert01Icon,
  ArrowRight01Icon,
  Building04Icon,
  ChartHistogramIcon,
  Delete01Icon,
  PencilEdit01Icon,
  TruckIcon,
  UserIcon,
  UserMultiple02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { TAdminComplaint, TAdminStatistics } from "@/types";

// Mock Data
const MOCK_ADMIN_STATS: TAdminStatistics = {
  reports: { total: 1284 },
  sppg: { total: 50 },
  school: { total: 25 },
  public: { total: 1350 },
  reviews: { school: 14, public: 8, total: 20 },
  sppgWarnings: {
    total: 2,
    sppgs: [
      { id: "1", name: "PT. Gizi Nutrisi", rating: 1.8, reportsCount: 12 },
      { id: "2", name: "PT. Sehat Bergizi", rating: 2.0, reportsCount: 10 },
    ],
  },
};

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

function getComplaintStatusUI(status: TAdminComplaint["status"]) {
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

export default function AdminDashboardPage() {
  const summaryStats = [
    {
      icon: <HugeiconsIcon icon={ChartHistogramIcon} size={20} />,
      iconClassName: "bg-orange-100 text-orange-600",
      badgeText: "LAPORAN",
      badgeClassName: "bg-orange-50 text-orange-600 hover:bg-orange-50",
      title: "Total Laporan SPPG",
      value: MOCK_ADMIN_STATS.reports.total.toLocaleString(),
    },
    {
      icon: <HugeiconsIcon icon={TruckIcon} size={20} />,
      iconClassName: "bg-sky-100 text-sky-600",
      badgeText: "SPPG",
      badgeClassName: "bg-sky-50 text-sky-600 hover:bg-sky-50",
      title: "Total Pengguna SPPG",
      value: `${MOCK_ADMIN_STATS.sppg.total} Vendor`,
    },
    {
      icon: <HugeiconsIcon icon={Building04Icon} size={20} />,
      iconClassName: "bg-emerald-100 text-emerald-600",
      badgeText: "SEKOLAH",
      badgeClassName: "bg-emerald-50 text-emerald-600 hover:bg-emerald-50",
      title: "Total Pengguna Sekolah",
      value: `${MOCK_ADMIN_STATS.school.total} Sekolah`,
    },
    {
      icon: <HugeiconsIcon icon={UserMultiple02Icon} size={20} />,
      iconClassName: "bg-purple-100 text-purple-600",
      badgeText: "UMUM",
      badgeClassName: "bg-purple-50 text-purple-600 hover:bg-purple-50",
      title: "Total Pengguna Umum",
      value: MOCK_ADMIN_STATS.public.total.toLocaleString(),
    },
  ];

  const totalReviews = MOCK_ADMIN_STATS.reviews.total || 1; // avoid div by 0
  const schoolPercent = Math.round(
    (MOCK_ADMIN_STATS.reviews.school / totalReviews) * 100,
  );
  const publicPercent = Math.round(
    (MOCK_ADMIN_STATS.reviews.public / totalReviews) * 100,
  );
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Panel Monitoring Pusat
        </h1>
        <p className="text-muted-foreground mt-2">
          Pantau real-time transparansi gizi dan realisasi anggaran publik
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <SummaryCard
            key={stat.title}
            icon={stat.icon}
            iconClassName={stat.iconClassName}
            badgeText={stat.badgeText}
            badgeClassName={stat.badgeClassName}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* Recent Complaints */}
      <DashboardCard className="overflow-hidden p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Keluhan Terbaru</h2>
          <Link
            href="/dashboard/admin/keluhan"
            className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Lihat Semua <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="font-medium text-muted-foreground uppercase text-xs tracking-wider">
                PELAPOR
              </TableHead>
              <TableHead className="font-medium text-muted-foreground uppercase text-xs tracking-wider">
                LAPORAN & VENDOR
              </TableHead>
              <TableHead className="font-medium text-muted-foreground uppercase text-xs tracking-wider">
                BUKTI FOTO
              </TableHead>
              <TableHead className="font-medium text-muted-foreground uppercase text-xs tracking-wider text-center">
                STATUS
              </TableHead>
              <TableHead className="text-right font-medium text-muted-foreground uppercase text-xs tracking-wider">
                AKSI
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_COMPLAINTS.map((complaint, index) => {
              const statusUI = getComplaintStatusUI(complaint.status);
              return (
                <TableRow
                  key={complaint.id}
                  className={cn(
                    index === MOCK_COMPLAINTS.length - 1
                      ? "border-none"
                      : "border-muted/50",
                  )}
                >
                  <TableCell className="py-4 align-top">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-gray-100">
                        <AvatarFallback className="bg-gray-100 text-gray-500">
                          <HugeiconsIcon icon={UserIcon} size={20} />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {complaint.authorName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 align-top">
                    <div className="flex flex-col">
                      <span className="font-medium">{complaint.title}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {complaint.vendorName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 align-top">
                    <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-200">
                      {/* Placeholder for image */}
                      <div className="h-full w-full bg-slate-800" />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 align-top text-center">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-md px-4 py-1.5 text-xs font-semibold whitespace-nowrap",
                        statusUI?.className,
                      )}
                    >
                      {statusUI?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="rounded p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        <HugeiconsIcon icon={PencilEdit01Icon} size={20} />
                      </button>
                      <button
                        type="button"
                        className="rounded p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        <HugeiconsIcon icon={ViewIcon} size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DashboardCard>

      {/* Bottom Section: Total Complaints & Vendor Warnings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Total Complaints */}
        <DashboardCard className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <HugeiconsIcon icon={Alert01Icon} size={24} />
            </div>
            <h3 className="font-bold">Total Keluhan</h3>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-6xl font-black">
              {MOCK_ADMIN_STATS.reviews.total}
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span>Sekolah</span>
                  <span className="text-muted-foreground">
                    {schoolPercent}%
                  </span>
                </div>
                {/* Custom Progress Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${schoolPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span>Umum</span>
                  <span className="text-muted-foreground">
                    {publicPercent}%
                  </span>
                </div>
                {/* Custom Progress Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${publicPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Vendor Warnings */}
        <DashboardCard className="border border-red-100 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <HugeiconsIcon icon={Alert01Icon} size={24} />
            </div>
            <h3 className="font-bold text-red-600">Peringatan Vendor</h3>
          </div>

          <div className="flex flex-col gap-3">
            {MOCK_ADMIN_STATS.sppgWarnings.sppgs.map((vendor) => (
              <div
                key={vendor.id}
                className="flex items-center justify-between rounded-xl bg-red-50 p-4 transition-colors hover:bg-red-100/80 cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-gray-900">{vendor.name}</h4>
                  <p className="text-sm text-gray-500">
                    Rating : {vendor.rating} ({vendor.reportsCount} Laporan
                    Baru)
                  </p>
                </div>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={20}
                  className="text-red-500"
                />
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
