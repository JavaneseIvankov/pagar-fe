"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useEffect, useRef } from "react";
import { SppgPublicReviewsSkeleton } from "@/components/dashboard/sppg/public-reviews-skeleton";
import { SppgPublicReviewsTable } from "@/components/dashboard/sppg/public-reviews-table";
import { FeedLoadMoreSentinel } from "@/components/reports/feed-load-more-sentinel";
import { PaginationControls } from "@/components/reports/pagination-controls";
import { PublicReportCard } from "@/components/reports/public-report-card";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  useInfiniteSppgReviews,
  useSppgReviews,
} from "@/hooks/use-sppg-reviews";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";

export function SppgPublicReviewsContainer() {
  const isMobile = useIsMobile();
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ scroll: false }),
  );
  const [search] = useQueryState("search", { defaultValue: "" });
  const previousSearchRef = useRef(search);

  useEffect(() => {
    if (previousSearchRef.current === search) {
      return;
    }

    previousSearchRef.current = search;
    void setPage(1);
  }, [search, setPage]);

  const pagedQuery = useSppgReviews({
    page,
    limit: REPORT_LIST_PAGE_SIZE,
  });
  const infiniteQuery = useInfiniteSppgReviews({
    limit: REPORT_LIST_PAGE_SIZE,
  });

  const pagedReviews = pagedQuery.data?.items ?? [];
  const infiniteReviews =
    infiniteQuery.data?.pages.flatMap((result) => result.items) ?? [];
  const reviews = isMobile ? infiniteReviews : pagedReviews;
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
    return <SppgPublicReviewsSkeleton />;
  }

  if (isError) {
    return <div className="py-8 text-destructive">Gagal memuat laporan.</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 border-dashed bg-muted/30 px-4 py-10 text-center text-muted-foreground text-sm">
        Belum ada laporan masyarakat.
      </div>
    );
  }

  return (
    <div className="page-enter flex w-full flex-col gap-4 sm:gap-6">
      {isMobile ? (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <PublicReportCard
              key={review.id}
              review={review}
              showSppgName={false}
            />
          ))}
        </div>
      ) : (
        <SppgPublicReviewsTable reviews={reviews} />
      )}

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
