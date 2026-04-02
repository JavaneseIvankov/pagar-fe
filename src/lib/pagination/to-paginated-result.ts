import type { TPaginatedResult } from "@/types";
import {
  extractPaginationMeta,
  type PaginationDefaults,
} from "./extract-pagination-meta";

interface ToPaginatedResultOptions<TItem> {
  defaults: PaginationDefaults;
  envelope?: {
    currentPage?: number;
    limit?: number;
    meta?: {
      currentPage?: number;
      limit?: number;
      totalItems?: number;
      totalPages?: number;
    };
    pagination?: {
      currentPage?: number;
      limit?: number;
      totalItems?: number;
      totalPages?: number;
    };
    totalItems?: number;
    totalPages?: number;
  };
  items: TItem[];
}

export function toPaginatedResult<TItem>({
  items,
  envelope,
  defaults,
}: ToPaginatedResultOptions<TItem>): TPaginatedResult<TItem> {
  return {
    items,
    meta: extractPaginationMeta(envelope, defaults),
  };
}
