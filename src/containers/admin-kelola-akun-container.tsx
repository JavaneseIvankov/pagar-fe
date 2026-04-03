"use client";

import { Shield01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";
import { CreateAkunDialog } from "@/components/admin/kelola-akun/create-akun-dialog";
import { DataAkunCard } from "@/components/admin/kelola-akun/data-akun-card";
import { ValidasiAkunCard } from "@/components/admin/kelola-akun/validasi-akun-card";
import {
  useAdminActiveAccounts,
  useAdminPendingAccounts,
  useCreateAdminManagedAccount,
  useUpdateAdminAccountStatus,
} from "@/hooks/use-admin-account-management";
import { cn } from "@/lib/utils";
import type {
  TAdminAccountRoleFilter,
  TAdminCreateManagedAccountInput,
} from "@/types";

export function AdminKelolaAkunContainer() {
  const [activeTab, setActiveTab] = useState<"data" | "validasi">("data");
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

  const handleApprove = (id: string) => {
    const account = pendingAccounts.find((item) => item.id === id);

    if (!account) {
      toast.error("Akun yang dipilih tidak ditemukan.");
      return;
    }

    updateAccountStatusMutation.mutate(
      {
        idUser: id,
        status: "APPROVED",
      },
      {
        onSuccess: () => {
          toast.success(`Akun ${account.username} berhasil disetujui.`);
        },
        onError: (error) => {
          toast.error(
            error instanceof Error ? error.message : "Gagal menyetujui akun.",
          );
        },
      },
    );
  };

  const handleReject = (id: string) => {
    const account = pendingAccounts.find((item) => item.id === id);

    if (!account) {
      toast.error("Akun yang dipilih tidak ditemukan.");
      return;
    }

    updateAccountStatusMutation.mutate(
      {
        idUser: id,
        status: "REJECTED",
      },
      {
        onSuccess: () => {
          toast.success(`Akun ${account.username} ditolak.`);
        },
        onError: (error) => {
          toast.error(
            error instanceof Error ? error.message : "Gagal menolak akun.",
          );
        },
      },
    );
  };

  const handleCreateAkun = (input: TAdminCreateManagedAccountInput) => {
    createAccountMutation.mutate(input, {
      onSuccess: (result) => {
        toast.success(`Akun ${result.user.username} berhasil dibuat.`);
        setIsCreateAkunDialogOpen(false);
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Gagal membuat akun.",
        );
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col pb-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-h2">Kelola Akun</h1>
          <p className="text-foreground text-sm">
            Kelola akun pengguna platform PaGar
          </p>
        </div>
        <div className="flex items-center rounded-lg border border-border/50 bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("data")}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-sm transition-colors",
              activeTab === "data"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <HugeiconsIcon icon={UserGroupIcon} className="h-4 w-4" /> Data Akun
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("validasi")}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-sm transition-colors",
              activeTab === "validasi"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <HugeiconsIcon icon={Shield01Icon} className="h-4 w-4" /> Validasi
            Akun
          </button>
        </div>
      </div>

      <div className="w-full">
        {activeTab === "data" ? (
          <DataAkunCard
            items={filteredActiveAccounts}
            selectedRoleFilter={selectedRoleFilter}
            onRoleFilterChange={setSelectedRoleFilter}
            onAddData={() => setIsCreateAkunDialogOpen(true)}
            isError={activeAccountsQuery.isError}
            isLoading={activeAccountsQuery.isLoading}
          />
        ) : (
          <ValidasiAkunCard
            items={pendingAccounts}
            onApprove={handleApprove}
            onReject={handleReject}
            updatingAccountId={updatingAccountId}
            isError={pendingAccountsQuery.isError}
            isLoading={pendingAccountsQuery.isLoading}
          />
        )}
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
