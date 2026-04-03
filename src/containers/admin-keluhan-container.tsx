"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import {
  AdminComplaintsTable,
  type AdminComplaintTableItem,
} from "@/components/dashboard/admin-complaints-table";
import { AdminDashboardSkeleton } from "@/components/dashboard/admin-dashboard-skeleton";
import { PaginationControls } from "@/components/reports/pagination-controls";
import {
  useAdminDashboardReviews,
  useUpdateAdminComplaintStatus,
} from "@/hooks/use-admin-dashboard";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";
import { getAdminComplaintStatusUi } from "@/lib/ui-mappers";

export function AdminKeluhanContainer() {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ scroll: false }),
  );

  const reviewsQuery = useAdminDashboardReviews({
    page,
    limit: REPORT_LIST_PAGE_SIZE,
  });
  const updateComplaintStatusMutation = useUpdateAdminComplaintStatus();

  if (reviewsQuery.isLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (reviewsQuery.isError || !reviewsQuery.data) {
    return (
      <div className="py-8 text-destructive">Gagal memuat keluhan admin.</div>
    );
  }

  const complaints: AdminComplaintTableItem[] = reviewsQuery.data.items.map(
    (complaint) => ({
      ...complaint,
      statusUi: getAdminComplaintStatusUi(complaint.status),
    }),
  );
  const updatingComplaintId = updateComplaintStatusMutation.isPending
    ? (updateComplaintStatusMutation.variables?.id ?? null)
    : null;

  return (
    <div className="flex w-full flex-col gap-6 sm:gap-8">
      <AdminComplaintsTable
        complaints={complaints}
        onUpdateStatus={async ({ id, status }) => {
          await updateComplaintStatusMutation.mutateAsync({
            id,
            status,
          });
        }}
        updatingComplaintId={updatingComplaintId}
      />

      <PaginationControls
        currentPage={reviewsQuery.data.meta.currentPage}
        totalPages={reviewsQuery.data.meta.totalPages}
        onPageChange={(nextPage) => {
          void setPage(nextPage);
        }}
      />
    </div>
  );
}
