import type { TPaginationMeta } from "@/types";

type PaginationEnvelope = {
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

export interface PaginationDefaults {
  itemCount: number;
  limit: number;
  page: number;
}

function normalizePositiveInt(value: number | undefined, fallback: number) {
  if (!Number.isFinite(value) || (value ?? 0) <= 0) {
    return fallback;
  }

  return Math.floor(value as number);
}

function toPaginationMeta(input: {
  currentPage?: number;
  limit?: number;
  totalItems?: number;
  totalPages?: number;
  defaults: PaginationDefaults;
}): TPaginationMeta {
  const limit = normalizePositiveInt(input.limit, input.defaults.limit);
  const page = normalizePositiveInt(input.currentPage, input.defaults.page);
  const totalItems = normalizePositiveInt(
    input.totalItems,
    input.defaults.itemCount,
  );
  const totalPages = normalizePositiveInt(
    input.totalPages,
    Math.max(1, Math.ceil(totalItems / limit)),
  );

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
  };
}

export function extractPaginationMeta(
  envelope: PaginationEnvelope | undefined,
  defaults: PaginationDefaults,
): TPaginationMeta {
  const fromMeta = envelope?.meta;
  const fromPagination = envelope?.pagination;

  if (
    fromMeta?.currentPage !== undefined ||
    fromMeta?.totalItems !== undefined ||
    fromMeta?.totalPages !== undefined
  ) {
    return toPaginationMeta({
      currentPage: fromMeta.currentPage,
      limit: fromMeta.limit ?? envelope?.limit,
      totalItems: fromMeta.totalItems,
      totalPages: fromMeta.totalPages,
      defaults,
    });
  }

  if (
    fromPagination?.currentPage !== undefined ||
    fromPagination?.totalItems !== undefined ||
    fromPagination?.totalPages !== undefined
  ) {
    return toPaginationMeta({
      currentPage: fromPagination.currentPage,
      limit: fromPagination.limit ?? envelope?.limit,
      totalItems: fromPagination.totalItems,
      totalPages: fromPagination.totalPages,
      defaults,
    });
  }

  if (
    envelope?.currentPage !== undefined ||
    envelope?.totalItems !== undefined ||
    envelope?.totalPages !== undefined
  ) {
    return toPaginationMeta({
      currentPage: envelope.currentPage,
      limit: envelope.limit,
      totalItems: envelope.totalItems,
      totalPages: envelope.totalPages,
      defaults,
    });
  }

  return toPaginationMeta({
    currentPage: defaults.page,
    limit: defaults.limit,
    totalItems: defaults.itemCount,
    totalPages: Math.max(1, Math.ceil(defaults.itemCount / defaults.limit)),
    defaults,
  });
}
