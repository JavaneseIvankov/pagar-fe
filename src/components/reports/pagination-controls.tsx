"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function clampPage(page: number, totalPages: number) {
  return Math.max(1, Math.min(totalPages, page));
}

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): (number | string)[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 1, totalPages]; // or maybe totalPages-2, totalPages-1, totalPages, but let's stick to 1, 2, ..., 9, 10
  }

  return [1, "...", currentPage, "...", totalPages];
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "size-10 rounded-lg",
          currentPage <= 1
            ? "border-transparent bg-muted text-muted-foreground opacity-100"
            : "border-border bg-background text-muted-foreground",
        )}
        onClick={() => onPageChange(clampPage(currentPage - 1, totalPages))}
        disabled={currentPage <= 1}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
        <span className="sr-only">Sebelumnya</span>
      </Button>

      {pages.map((page, idx) => {
        if (page === "...") {
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: stable index
              key={`ellipsis-${idx}`}
              className="flex size-10 items-center justify-center rounded-lg border border-border bg-background font-bold text-foreground text-lg tracking-widest"
            >
              ...
            </div>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <Button
            key={`page-${page}`}
            type="button"
            variant={isCurrent ? "outline" : "outline"}
            size="icon"
            className={cn(
              "size-10 rounded-lg font-bold text-lg",
              isCurrent
                ? "border-2 border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                : "border border-border bg-background text-foreground hover:bg-muted/40",
            )}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "size-10 rounded-lg",
          currentPage >= totalPages
            ? "border-transparent bg-muted text-muted-foreground opacity-100"
            : "border-border bg-background text-muted-foreground",
        )}
        onClick={() => onPageChange(clampPage(currentPage + 1, totalPages))}
        disabled={currentPage >= totalPages}
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
        <span className="sr-only">Berikutnya</span>
      </Button>
    </div>
  );
}
