"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useEffect, useRef } from "react";
import { FeedLoadMoreSentinel } from "@/components/reports/feed-load-more-sentinel";
import { PaginationControls } from "@/components/reports/pagination-controls";
import { SppgReportCard } from "@/components/reports/sppg-report-card";
import { SppgReportListSkeleton } from "@/components/reports/sppg-report-list-skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  useInfiniteSppgReports,
  useSppgReports,
} from "@/hooks/use-sppg-reports";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";

export function SppgReportContainer() {
  const isMobile = useIsMobile();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search", { defaultValue: "" });
  const previousSearchRef = useRef(search);

  useEffect(() => {
    if (previousSearchRef.current === search) {
      return;
    }

    previousSearchRef.current = search;
    void setPage(1);
  }, [search, setPage]);

  const pagedQuery = useSppgReports({
    page,
    limit: REPORT_LIST_PAGE_SIZE,
    search,
  });
  const infiniteQuery = useInfiniteSppgReports({
    limit: REPORT_LIST_PAGE_SIZE,
    search,
  });

  const pagedReports = pagedQuery.data?.items ?? [];
  const infiniteReports =
    infiniteQuery.data?.pages.flatMap((result) => result.items) ?? [];
  const reports = isMobile ? infiniteReports : pagedReports;
  const isLoading = isMobile ? infiniteQuery.isLoading : pagedQuery.isLoading;
  const isError = isMobile ? infiniteQuery.isError : pagedQuery.isError;
  const paginationMeta = pagedQuery.data?.meta;

  const handleLoadMore = useCallback(() => {
    if (
      !isMobile ||
      infiniteQuery.isFetchingNextPage ||
      !infiniteQuery.hasNextPage
    ) {
      return;
    }

    void infiniteQuery.fetchNextPage();
  }, [
    infiniteQuery.fetchNextPage,
    infiniteQuery.hasNextPage,
    infiniteQuery.isFetchingNextPage,
    isMobile,
  ]);

  if (isLoading) {
    return <SppgReportListSkeleton />;
  }

  if (isError) {
    return <div className="py-8 text-destructive">Gagal memuat laporan.</div>;
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 border-dashed bg-muted/30 px-4 py-10 text-center text-muted-foreground text-sm">
        Belum ada laporan SPPG.
      </div>
    );
  }

  return (
    <div className="page-enter flex w-full max-w-[1200px] flex-col gap-4 sm:gap-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {reports.map((report) => (
          <SppgReportCard key={report.id} report={report} />
        ))}
      </div>

      {!isMobile && paginationMeta ? (
        <PaginationControls
          currentPage={paginationMeta.page}
          totalPages={paginationMeta.totalPages}
          onPageChange={(nextPage) => {
            void setPage(nextPage);
          }}
        />
      ) : null}

      {isMobile ? (
        <>
          <FeedLoadMoreSentinel
            onVisible={handleLoadMore}
            disabled={
              infiniteQuery.isFetchingNextPage || !infiniteQuery.hasNextPage
            }
          />
          {infiniteQuery.isFetchingNextPage ? (
            <p className="text-center text-muted-foreground text-sm">
              Memuat laporan berikutnya...
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
