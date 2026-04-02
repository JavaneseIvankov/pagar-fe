"use server";

import { ApiClientError } from "@/lib/api";
import { requireCurrentRole } from "@/lib/auth/server";
import {
  mapPublicDashboardReviewDtoToDomain,
  mapPublicDashboardSppgReportDtoToDomain,
  type TPublicReview,
  type TSppg,
  type TSppgReport,
  type TSppgReportDetail,
} from "@/types";
import { createServerRpc } from "./server-rpc";

type ReportViewerRole = "PUBLIC" | "SCHOOL";

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
  async ({ client }): Promise<TSppgReport[]> => {
    const role = await getCurrentReportViewerRole();
    const response =
      role === "PUBLIC"
        ? await client.getPublicDashboardSppgReports()
        : await client.getSchoolDashboardSppgReports();

    return response.data.map(mapPublicDashboardSppgReportDtoToDomain);
  },
);

export const fetchPublicReviews = createServerRpc(
  {
    operation: "fetchPublicReviews",
    onAuthExpired: "redirect",
  },
  async ({ client }): Promise<TPublicReview[]> => {
    const role = await getCurrentReportViewerRole();
    const response =
      role === "PUBLIC"
        ? await client.getPublicDashboardReviews()
        : await client.getSchoolDashboardReviews();

    return response.data.map(mapPublicDashboardReviewDtoToDomain);
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
      const reports = await fetchSppgReports();
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
