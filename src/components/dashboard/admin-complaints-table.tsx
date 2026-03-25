import {
  ArrowRight01Icon,
  PencilEdit01Icon,
  UserIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { DashboardCard } from "./dashboard-card";

import type { TAdminComplaint } from "@/types";

export interface AdminComplaintStatusUi {
  className: string;
  label: string;
}

export interface AdminComplaintTableItem extends TAdminComplaint {
  statusUi: AdminComplaintStatusUi;
}

export interface AdminComplaintsTableProps {
  complaints: AdminComplaintTableItem[];
}

export function AdminComplaintsTable({
  complaints,
}: AdminComplaintsTableProps) {
  return (
    <DashboardCard className="overflow-hidden p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-xl">Keluhan Terbaru</h2>
        <Link
          href="/dashboard/admin/keluhan"
          className="flex items-center gap-2 font-semibold text-emerald-600 text-sm hover:text-emerald-700"
        >
          Lihat Semua <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              PELAPOR
            </TableHead>
            <TableHead className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              LAPORAN & VENDOR
            </TableHead>
            <TableHead className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              BUKTI FOTO
            </TableHead>
            <TableHead className="text-center font-medium text-muted-foreground text-xs uppercase tracking-wider">
              STATUS
            </TableHead>
            <TableHead className="text-right font-medium text-muted-foreground text-xs uppercase tracking-wider">
              AKSI
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint, index) => (
            <TableRow
              key={complaint.id}
              className={cn(
                index === complaints.length - 1
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
                  <span className="font-medium">{complaint.authorName}</span>
                </div>
              </TableCell>
              <TableCell className="py-4 align-top">
                <div className="flex flex-col">
                  <span className="font-medium">{complaint.title}</span>
                  <span className="mt-1 text-muted-foreground text-xs">
                    {complaint.vendorName}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-4 align-top">
                <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-200">
                  <div className="h-full w-full bg-slate-800" />
                </div>
              </TableCell>
              <TableCell className="py-4 text-center align-top">
                <Badge
                  variant="secondary"
                  className={cn(
                    "whitespace-nowrap rounded-md px-4 py-1.5 font-semibold text-xs",
                    complaint.statusUi.className,
                  )}
                >
                  {complaint.statusUi.label}
                </Badge>
              </TableCell>
              <TableCell className="py-4 text-right align-top">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="rounded p-2 text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    <HugeiconsIcon icon={PencilEdit01Icon} size={20} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-2 text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    <HugeiconsIcon icon={ViewIcon} size={20} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCard>
  );
}
