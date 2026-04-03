"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminComplaintStatusUi } from "@/lib/ui-mappers";
import { cn } from "@/lib/utils";
import type { TAdminComplaint, TAdminComplaintStatus } from "@/types";
import { AvatarFallbackIcon } from "../avatar-fallback-icon";
import { PencilIcon } from "../exported-icons";
import { DashboardCard } from "./dashboard-card";

export interface AdminComplaintStatusUi {
  className: string;
  label: string;
}

export interface AdminComplaintTableItem extends TAdminComplaint {
  statusUi: AdminComplaintStatusUi;
}

export interface AdminComplaintsTableProps {
  complaints: AdminComplaintTableItem[];
  onUpdateStatus: (params: {
    id: string;
    status: TAdminComplaintStatus;
  }) => void;
  updatingComplaintId: null | string;
}

export function AdminComplaintsTable({
  complaints,
  onUpdateStatus,
  updatingComplaintId,
}: AdminComplaintsTableProps) {
  const [selectedComplaintId, setSelectedComplaintId] = useState<null | string>(
    null,
  );
  const [selectedStatus, setSelectedStatus] =
    useState<null | TAdminComplaintStatus>(null);
  const selectedComplaint = useMemo(
    () => complaints.find((complaint) => complaint.id === selectedComplaintId),
    [complaints, selectedComplaintId],
  );
  const isOpen = selectedComplaint !== undefined;
  const isSaving =
    selectedComplaint !== undefined &&
    updatingComplaintId === selectedComplaint.id;
  const hasStatusChanged =
    selectedComplaint !== undefined &&
    selectedStatus !== null &&
    selectedStatus !== selectedComplaint.status;
  const statusOptions: TAdminComplaintStatus[] = [
    "PENDING",
    "INVESTIGATING",
    "RESOLVED",
  ];

  const resetModal = () => {
    setSelectedComplaintId(null);
    setSelectedStatus(null);
  };

  const handleOpenDetail = (complaint: AdminComplaintTableItem) => {
    setSelectedComplaintId(complaint.id);
    setSelectedStatus(complaint.status);
  };

  const handleSaveStatus = async () => {
    if (
      selectedComplaint === undefined ||
      selectedStatus === null ||
      !hasStatusChanged
    ) {
      return;
    }

    onUpdateStatus({
      id: selectedComplaint.id,
      status: selectedStatus,
    });
    resetModal();
  };

  return (
    <>
      <DashboardCard className="overflow-hidden p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold text-xl">Keluhan Terbaru</h2>
          <Button asChild variant="ghost" className="h-auto w-fit gap-2 p-0">
            <Link href="/dashboard/admin/keluhan">
              Lihat Semua <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </Link>
          </Button>
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
                    <Avatar className="h-10 w-10">
                      <AvatarFallbackIcon />
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
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-muted">
                    {complaint.imageUrl ? (
                      <Image
                        src={complaint.imageUrl}
                        alt={complaint.title}
                        className="h-full w-full object-cover"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs">
                        -
                      </div>
                    )}
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
                      className="rounded p-2 text-muted-foreground transition-colors hover:bg-muted"
                      onClick={() => handleOpenDetail(complaint)}
                    >
                      <PencilIcon className="size-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardCard>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetModal();
          }
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Detail Keluhan</DialogTitle>
            <DialogDescription>
              Tinjau rincian keluhan dan perbarui status penanganan.
            </DialogDescription>
          </DialogHeader>

          {selectedComplaint ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                <div className="h-28 overflow-hidden rounded-lg border">
                  {selectedComplaint.imageUrl ? (
                    <Image
                      src={selectedComplaint.imageUrl}
                      alt={selectedComplaint.title}
                      className="h-full w-full object-cover"
                      width={140}
                      height={112}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted px-3 text-center text-muted-foreground text-xs">
                      foto belum tersedia
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">{selectedComplaint.title}</p>
                  <p className="text-muted-foreground text-sm">
                    Pelapor: {selectedComplaint.authorName}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Vendor: {selectedComplaint.vendorName}
                  </p>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "w-fit whitespace-nowrap rounded-md px-3 py-1 font-semibold text-xs",
                      getAdminComplaintStatusUi(selectedComplaint.status)
                        .className,
                    )}
                  >
                    {getAdminComplaintStatusUi(selectedComplaint.status).label}
                  </Badge>
                </div>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel>Deskripsi Keluhan</FieldLabel>
                  <p className="rounded-md border bg-muted/30 p-3 text-sm leading-relaxed">
                    {selectedComplaint.description}
                  </p>
                </Field>
                <Field>
                  <FieldLabel htmlFor="complaint-status">
                    Ubah Status Keluhan
                  </FieldLabel>
                  <Select
                    value={selectedStatus ?? selectedComplaint.status}
                    onValueChange={(value) =>
                      setSelectedStatus(value as TAdminComplaintStatus)
                    }
                  >
                    <SelectTrigger id="complaint-status" className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {getAdminComplaintStatusUi(status).label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
            </div>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={resetModal}
              disabled={isSaving}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleSaveStatus}
              disabled={isSaving || !hasStatusChanged}
            >
              {isSaving ? "Menyimpan..." : "Simpan Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
