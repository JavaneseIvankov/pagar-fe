"use server";

import { ApiClientError } from "@/lib/api";
import { requireCurrentRole } from "@/lib/auth/server";
import { REPORT_LIST_PAGE_SIZE } from "@/lib/pagination/constants";
import { toPaginatedResult } from "@/lib/pagination/to-paginated-result";
import {
  mapPublicDashboardReviewDtoToDomain,
  mapPublicDashboardSppgReportDtoToDomain,
  type TPaginatedResult,
  type TPublicReview,
  type TSppg,
  type TSppgReport,
  type TSppgReportDetail,
} from "@/types";
import { createServerRpc } from "./server-rpc";

type ReportViewerRole = "PUBLIC" | "SCHOOL";

export interface FetchReportListParams {
  limit?: number;
  page?: number;
}

function resolveListParams(params?: FetchReportListParams) {
  return {
    page: params?.page && params.page > 0 ? Math.floor(params.page) : 1,
    limit:
      params?.limit && params.limit > 0
        ? Math.floor(params.limit)
        : REPORT_LIST_PAGE_SIZE,
  };
}

function paginateLocalItems<TItem>(
  items: TItem[],
  params: {
    limit: number;
    page: number;
  },
): TPaginatedResult<TItem> {
  const startIndex = (params.page - 1) * params.limit;
  const pagedItems = items.slice(startIndex, startIndex + params.limit);

  return toPaginatedResult({
    items: pagedItems,
    defaults: {
      page: params.page,
      limit: params.limit,
      itemCount: items.length,
    },
  });
}

// TODO: this will cause all other client files to error, because this fn is server-only
async function getCurrentReportViewerRole(): Promise<ReportViewerRole> {
  const session = await requireCurrentRole(
    ["PUBLIC", "SCHOOL"],
    "Halaman laporan hanya tersedia untuk akun publik dan sekolah.",
  );

  return session.user.role;
}

function createFallbackAuthor(values: {
  address: null | string;
  id: number | string;
  name: string;
}): TSppg {
  const id = String(values.id);

  return {
    id,
    role: "SPPG",
    username: values.name.toLowerCase().replace(/\s+/g, "-"),
    sppgId: id,
    sppgName: values.name,
    address: values.address ?? "Alamat vendor belum tersedia",
  };
}

export const fetchSppgReports = createServerRpc(
  {
    operation: "fetchSppgReports",
    onAuthExpired: "redirect",
  },
  async (
    { client },
    params?: FetchReportListParams,
  ): Promise<TPaginatedResult<TSppgReport>> => {
    const normalizedParams = resolveListParams(params);
    const role = await getCurrentReportViewerRole();

    if (role === "PUBLIC") {
      const response = await client.getPublicDashboardSppgReports();
      const mapped = response.data.map(mapPublicDashboardSppgReportDtoToDomain);

      return paginateLocalItems(mapped, normalizedParams);
    }

    const response = await client.getSchoolDashboardSppgReports({
      query: {
        page: normalizedParams.page,
        limit: normalizedParams.limit,
      },
    });

    return toPaginatedResult({
      items: response.data.map(mapPublicDashboardSppgReportDtoToDomain),
      envelope: response,
      defaults: {
        page: normalizedParams.page,
        limit: normalizedParams.limit,
        itemCount: response.data.length,
      },
    });
  },
);

export const fetchPublicReviews = createServerRpc(
  {
    operation: "fetchPublicReviews",
    onAuthExpired: "redirect",
  },
  async (
    { client },
    params?: FetchReportListParams,
  ): Promise<TPaginatedResult<TPublicReview>> => {
    const normalizedParams = resolveListParams(params);
    const role = await getCurrentReportViewerRole();

    if (role === "PUBLIC") {
      const response = await client.getPublicDashboardReviews();
      const mapped = response.data.map(mapPublicDashboardReviewDtoToDomain);

      return paginateLocalItems(mapped, normalizedParams);
    }

    const response = await client.getSchoolDashboardReviews({
      query: {
        page: normalizedParams.page,
        limit: normalizedParams.limit,
      },
    });

    return toPaginatedResult({
      items: response.data.map(mapPublicDashboardReviewDtoToDomain),
      envelope: response,
      defaults: {
        page: normalizedParams.page,
        limit: normalizedParams.limit,
        itemCount: response.data.length,
      },
    });
  },
);

export const fetchSppgReportDetail = createServerRpc(
  {
    operation: "fetchSppgReportDetail",
    onAuthExpired: "redirect",
  },
  async ({ client }, id: string): Promise<TSppgReportDetail | null> => {
    try {
      const response = await client.getDetailSppgReport({
        params: {
          id_daily_report: id,
        },
      });
      const reportsResponse = await fetchSppgReports({
        limit: 50,
        page: 1,
      });
      const reports = reportsResponse.items;
      const matchedReport = reports.find((report) => report.id === id);
      const detail = response.data;
      const author =
        matchedReport?.author ??
        createFallbackAuthor({
          id: detail.id_sppg,
          name: detail.sppg.sppg_name,
          address: detail.sppg.sppg_address,
        });

      return {
        id: String(detail.id_daily_report),
        title: detail.menu_name,
        author,
        mealTime: detail.meal_time ?? "Makan Siang",
        imageUrl:
          detail.attachments[0]?.file_url ??
          matchedReport?.imageUrl ??
          "https://placehold.co/1200x800?text=No+Image",
        postedAt: new Date(detail.date_report),
        nutritionalFacts: {
          calories: {
            inKcal: detail.energy ?? 0,
            inDciPercent: 0,
          },
          proteinGrams: {
            inGrams: detail.protein ?? 0,
            inDciPercent: 0,
          },
          carbGrams: {
            inGrams: detail.carbohydrate ?? 0,
            inDciPercent: 0,
          },
          fatGrams: {
            inGrams: detail.fat ?? 0,
            inDciPercent: 0,
          },
        },
        content: detail.menu_description ?? "",
        status: "SUBMITTED",
        budget: {
          id: String(detail.id_daily_report),
          items: [],
          totalPrice: 0,
          attachments: [],
        },
        relatedReports: reports
          .filter((report) => report.id !== id)
          .slice(0, 2),
      };
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }

      throw error;
    }
  },
);
