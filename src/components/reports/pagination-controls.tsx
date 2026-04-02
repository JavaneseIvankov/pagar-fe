"use client";

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

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onPageChange(clampPage(currentPage - 1, totalPages))}
        disabled={currentPage <= 1}
      >
        Sebelumnya
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          type="button"
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          className={cn("min-w-9", page === currentPage ? "font-semibold" : "")}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onPageChange(clampPage(currentPage + 1, totalPages))}
        disabled={currentPage >= totalPages}
      >
        Berikutnya
      </Button>
    </div>
  );
}
