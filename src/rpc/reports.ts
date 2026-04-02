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
  search?: string;
}

function resolveListParams(params?: FetchReportListParams) {
  const trimmedSearch = params?.search?.trim();

  return {
    page: params?.page && params.page > 0 ? Math.floor(params.page) : 1,
    limit:
      params?.limit && params.limit > 0
        ? Math.floor(params.limit)
        : REPORT_LIST_PAGE_SIZE,
    search: trimmedSearch ? trimmedSearch : undefined,
  };
}

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
      const response = await client.getPublicDashboardSppgReports({
        query: {
          page: normalizedParams.page,
          limit: normalizedParams.limit,
          search: normalizedParams.search,
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
    }

    const response = await client.getSchoolDashboardSppgReports({
      query: {
        page: normalizedParams.page,
        limit: normalizedParams.limit,
        search: normalizedParams.search,
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
      const response = await client.getPublicDashboardReviews({
        query: {
          page: normalizedParams.page,
          limit: normalizedParams.limit,
          search: normalizedParams.search,
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
    }

    const response = await client.getSchoolDashboardReviews({
      query: {
        page: normalizedParams.page,
        limit: normalizedParams.limit,
        search: normalizedParams.search,
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
      const role = await getCurrentReportViewerRole();
      const reportsResponse =
        role === "PUBLIC"
          ? await client.getPublicDashboardSppgReports({
              query: {
                page: 1,
                limit: 50,
              },
            })
          : await client.getSchoolDashboardSppgReports({
              query: {
                page: 1,
                limit: 50,
              },
            });
      const reports = reportsResponse.data.map(
        mapPublicDashboardSppgReportDtoToDomain,
      );
      const matchedReport = reports.find((report) => report.id === id);
      const relatedReports = reports
        .filter((report) => report.id !== id)
        .slice(0, 2);

      if (role === "SCHOOL") {
        if (!matchedReport) {
          return null;
        }

        return {
          ...matchedReport,
          budget: {
            id: matchedReport.id,
            items: [],
            totalPrice: 0,
            attachments: [],
          },
          relatedReports,
        };
      }

      const response = await client.getDetailSppgReport({
        params: {
          id_daily_report: id,
        },
      });
      const detail = response.data;
      const author =
        matchedReport?.author ??
        createFallbackAuthor({
          id: detail.id_sppg,
          name: detail.sppg.sppg_name,
          address:
            detail.sppg.sppg_address === undefined
              ? null
              : detail.sppg.sppg_address,
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
        relatedReports,
      };
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }

      throw error;
    }
  },
);
