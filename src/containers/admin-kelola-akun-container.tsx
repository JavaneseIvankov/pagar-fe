"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DataAkunCard } from "@/components/admin/kelola-akun/data-akun-card";
import { ValidasiAkunCard } from "@/components/admin/kelola-akun/validasi-akun-card";
import {
  useAdminActiveAccounts,
  useAdminPendingAccounts,
  useUpdateAdminAccountStatus,
} from "@/hooks/use-admin-account-management";
import type { TAdminAccountRoleFilter } from "@/types";

// TASK: simplify this, abstract logic into hooks
// TASK: make this responsive on smaller device

export function AdminKelolaAkunContainer() {
  const [selectedRoleFilter, setSelectedRoleFilter] =
    useState<TAdminAccountRoleFilter>("ALL");
  const activeAccountsQuery = useAdminActiveAccounts();
  const pendingAccountsQuery = useAdminPendingAccounts();
  const updateAccountStatusMutation = useUpdateAdminAccountStatus();

  const activeAccounts = activeAccountsQuery.data ?? [];
  const pendingAccounts = pendingAccountsQuery.data ?? [];
  const updatingAccountId = updateAccountStatusMutation.isPending
    ? (updateAccountStatusMutation.variables?.idUser ?? null)
    : null;

  const filteredActiveAccounts =
    selectedRoleFilter === "ALL"
      ? activeAccounts
      : activeAccounts.filter((account) => {
          return account.role === selectedRoleFilter;
        });

  const handleApprove = async (id: string) => {
    const account = pendingAccounts.find((item) => item.id === id);

    if (!account) {
      toast.error("Akun yang dipilih tidak ditemukan.");
      return;
    }

    try {
      await updateAccountStatusMutation.mutateAsync({
        idUser: id,
        status: "APPROVED",
      });
      toast.success(`Akun ${account.username} berhasil disetujui.`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menyetujui akun.",
      );
    }
  };

  const handleReject = async (id: string) => {
    const account = pendingAccounts.find((item) => item.id === id);

    if (!account) {
      toast.error("Akun yang dipilih tidak ditemukan.");
      return;
    }

    try {
      await updateAccountStatusMutation.mutateAsync({
        idUser: id,
        status: "REJECTED",
      });
      toast.success(`Akun ${account.username} ditolak.`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menolak akun.",
      );
    }
  };

  return (
    <div className="flex h-full w-full flex-col pb-10">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="font-bold text-2xl">Kelola Akun</h1>
        <p className="text-foreground text-sm">
          Kelola akun pengguna platform PaGar
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_400px]">
        <DataAkunCard
          items={filteredActiveAccounts}
          selectedRoleFilter={selectedRoleFilter}
          onRoleFilterChange={setSelectedRoleFilter}
          isError={activeAccountsQuery.isError}
          isLoading={activeAccountsQuery.isLoading}
        />
        <ValidasiAkunCard
          items={pendingAccounts}
          onApprove={handleApprove}
          onReject={handleReject}
          updatingAccountId={updatingAccountId}
          isError={pendingAccountsQuery.isError}
          isLoading={pendingAccountsQuery.isLoading}
        />
      </div>
    </div>
  );
}
