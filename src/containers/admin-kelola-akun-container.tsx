"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CreateAkunDialog } from "@/components/admin/kelola-akun/create-akun-dialog";
import { DataAkunCard } from "@/components/admin/kelola-akun/data-akun-card";
import { ValidasiAkunCard } from "@/components/admin/kelola-akun/validasi-akun-card";
import { Button } from "@/components/ui/button";
import {
  useAdminActiveAccounts,
  useAdminPendingAccounts,
  useCreateAdminManagedAccount,
  useUpdateAdminAccountStatus,
} from "@/hooks/use-admin-account-management";
import type {
  TAdminAccountRoleFilter,
  TAdminCreateManagedAccountInput,
} from "@/types";

// TASK: simplify this, abstract logic into hooks
// TASK: make this responsive on smaller device

export function AdminKelolaAkunContainer() {
  const [selectedRoleFilter, setSelectedRoleFilter] =
    useState<TAdminAccountRoleFilter>("ALL");
  const [isCreateAkunDialogOpen, setIsCreateAkunDialogOpen] = useState(false);
  const activeAccountsQuery = useAdminActiveAccounts();
  const pendingAccountsQuery = useAdminPendingAccounts();
  const updateAccountStatusMutation = useUpdateAdminAccountStatus();
  const createAccountMutation = useCreateAdminManagedAccount();

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

  const handleCreateAkun = async (input: TAdminCreateManagedAccountInput) => {
    try {
      const result = await createAccountMutation.mutateAsync(input);
      toast.success(`Akun ${result.user.username} berhasil dibuat.`);
      setIsCreateAkunDialogOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal membuat akun.",
      );
    }
  };

  // FIXME: fix header sytling

  return (
    <div className="flex h-full w-full flex-col pb-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-h2">Kelola Akun</h1>
          <p className="text-foreground text-sm">
            Kelola akun pengguna platform PaGar
          </p>
        </div>
        <Button type="button" onClick={() => setIsCreateAkunDialogOpen(true)}>
          + Buat Akun
        </Button>
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

      <CreateAkunDialog
        open={isCreateAkunDialogOpen}
        onOpenChange={setIsCreateAkunDialogOpen}
        isSubmitting={createAccountMutation.isPending}
        onSubmit={handleCreateAkun}
      />
    </div>
  );
}
