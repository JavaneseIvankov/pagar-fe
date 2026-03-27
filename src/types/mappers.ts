import type { z } from "zod/v3";
import type {
  getAdminDashboardSuccessResponseSchema,
  getActiveAccountsSuccessResponseSchema,
  getPublicDashboardReviewsSuccessResponseSchema,
  getPublicDashboardSppgReportsSuccessResponseSchema,
  getPendingAccountsSuccessResponseSchema,
  getSppgDailyReportByIdSuccessResponseSchema,
  getSppgDashboardSuccessResponseSchema,
  getSppgPeriodicReportsSuccessResponseSchema,
} from "@/types/dto";
import type {
  TAdminActiveAccount,
  TAdminPendingAccount,
  TAdminComplaint,
  TAdminComplaintStatus,
  TAdminDashboard,
  TAdminStatistics,
  TAdminVendorWarning,
  TBudget,
  TPublicReview,
  TSppg,
  TSppgDashboard,
  TSppgPeriodicReport,
  TSppgReport,
  TSppgReportDetail,
  TSppgReportSummary,
  TSppgStatistics,
} from "./ui";

type PublicDashboardReviewItem = z.infer<
  typeof getPublicDashboardReviewsSuccessResponseSchema
>["data"][number];
type PublicDashboardReportItem = z.infer<
  typeof getPublicDashboardSppgReportsSuccessResponseSchema
>["data"][number];
type SppgDailyReportDetailItem = z.infer<
  typeof getSppgDailyReportByIdSuccessResponseSchema
>["data"];
type SppgDashboardResponse = z.infer<
  typeof getSppgDashboardSuccessResponseSchema
>["data"];
type AdminDashboardResponse = z.infer<
  typeof getAdminDashboardSuccessResponseSchema
>["data"];
type ActiveAccountsResponse = z.infer<
  typeof getActiveAccountsSuccessResponseSchema
>["data"][number];
type PendingAccountsResponse = z.infer<
  typeof getPendingAccountsSuccessResponseSchema
>["data"][number];
type PeriodicReportsResponse = z.infer<
  typeof getSppgPeriodicReportsSuccessResponseSchema
>["data"];

const DEFAULT_ATTACHMENT_URL = "https://placehold.co/1200x800?text=No+Image";
const DEFAULT_VENDOR_ADDRESS = "Alamat vendor belum tersedia";

function mapReviewStatusToAdminComplaintStatus(
  status: "MENUNGGU" | "INVESTIGASI" | "SELESAI",
): TAdminComplaintStatus {
  switch (status) {
    case "MENUNGGU":
      return "PENDING";
    case "INVESTIGASI":
      return "INVESTIGATING";
    case "SELESAI":
      return "RESOLVED";
  }
}

function createNutritionalFacts(values: {
  energy: number | null;
  protein: number | null;
  carbohydrate: number | null;
  fat: number | null;
}) {
  return {
    calories: {
      inKcal: values.energy ?? 0,
      inDciPercent: 0,
    },
    proteinGrams: {
      inGrams: values.protein ?? 0,
      inDciPercent: 0,
    },
    carbGrams: {
      inGrams: values.carbohydrate ?? 0,
      inDciPercent: 0,
    },
    fatGrams: {
      inGrams: values.fat ?? 0,
      inDciPercent: 0,
    },
  };
}

function createSppgAuthor(values: {
  id: number;
  userId: string;
  username?: string;
  name: string;
  address?: string | null;
}): TSppg {
  return {
    id: values.userId,
    role: "SPPG",
    username: values.username ?? `sppg-${values.id}`,
    sppgId: String(values.id),
    sppgName: values.name,
    address: values.address ?? DEFAULT_VENDOR_ADDRESS,
  };
}

function createReviewTarget(values: {
  id: number | null;
  name?: string | null;
  username?: string;
}) {
  return {
    id: String(values.id ?? 0),
    username: values.username ?? `sppg-${values.id ?? 0}`,
    sppgId: String(values.id ?? 0),
    sppgName: values.name ?? "SPPG",
  };
}

export function mapPublicDashboardReviewDtoToDomain(
  dto: PublicDashboardReviewItem,
): TPublicReview {
  const imageUrl = dto.attachments?.[0]?.file_url ?? DEFAULT_ATTACHMENT_URL;
  return {
    id: String(dto.id_review),
    title: dto.title ?? "Laporan Masyarakat",
    imageUrl,
    postedAt: new Date(
      dto.createdAt ?? dto.updatedAt ?? new Date().toISOString(),
    ),
    ratingScore: dto.rating_score ?? 0,
    reporterName: dto.display_author,
    forSppg: createReviewTarget({
      id: dto.id_sppg,
      name: dto.sppg?.sppg_name,
    }),
    content: dto.description ?? "",
  };
}

export function mapPublicDashboardSppgReportDtoToDomain(
  dto: PublicDashboardReportItem,
): TSppgReport {
  return {
    id: String(dto.id_daily_report),
    title: dto.menu_name,
    author: createSppgAuthor({
      id: dto.id_sppg,
      userId: `00000000-0000-4000-8000-${String(dto.id_sppg).padStart(12, "0")}`,
      name: dto.sppg.sppg_name,
      address: dto.sppg.sppg_address,
    }),
    mealTime: dto.meal_time ?? "Makan Siang",
    imageUrl: dto.attachments?.[0]?.file_url ?? DEFAULT_ATTACHMENT_URL,
    postedAt: new Date(dto.date_report),
    nutritionalFacts: createNutritionalFacts({
      energy: dto.energy,
      protein: dto.protein,
      carbohydrate: dto.carbohydrate,
      fat: dto.fat,
    }),
    content: dto.menu_description ?? "",
    status: "SUBMITTED",
  };
}

export function mapSppgDailyReportDetailDtoToDomain(
  dto: SppgDailyReportDetailItem,
): TSppgReportDetail {
  const report: TSppgReport = {
    id: String(dto.id_daily_report),
    title: dto.menu_name,
    author: createSppgAuthor({
      id: dto.id_sppg,
      userId: `00000000-0000-4000-8000-${String(dto.id_sppg).padStart(12, "0")}`,
      name: "SPPG",
    }),
    mealTime: dto.meal_time ?? "Makan Siang",
    imageUrl: dto.attachments?.[0]?.file_url ?? DEFAULT_ATTACHMENT_URL,
    postedAt: new Date(dto.date_report),
    nutritionalFacts: createNutritionalFacts({
      energy: dto.energy,
      protein: dto.protein,
      carbohydrate: dto.carbohydrate,
      fat: dto.fat,
    }),
    content: dto.menu_description ?? "",
    status: "SUBMITTED",
  };

  const budget: TBudget = {
    id: String(dto.id_daily_report),
    items:
      dto.budgets?.map((item) => ({
        id: String(item.id_budget),
        name: item.item_name,
        price: Number(item.item_price),
      })) ?? [],
    totalPrice:
      dto.budgets?.reduce((sum, item) => sum + Number(item.item_price), 0) ?? 0,
    attachments:
      dto.attachments?.map((attachment) => ({
        id: String(attachment.id_attachment),
        label: attachment.file_category ?? attachment.entity_type,
        url: attachment.file_url,
        mimeType: attachment.file_type ?? "application/octet-stream",
      })) ?? [],
  };

  return {
    ...report,
    budget,
    relatedReports: [],
  };
}

function mapDashboardRecentReportDtoToDomain(dto: {
  id_daily_report: number;
  menu_name: string;
  date_report: string;
}): TSppgReportSummary {
  return {
    id: String(dto.id_daily_report),
    title: dto.menu_name,
    postedAt: new Date(dto.date_report),
    status: "SUBMITTED",
  };
}

export function mapSppgDashboardDtoToDomain(
  dto: SppgDashboardResponse,
): TSppgDashboard {
  const statistics: TSppgStatistics = {
    isDailyReportSubmitted: dto.widgets.status_hari_ini === "SELESAI",
    weeklyCalories: {
      average: dto.widgets.rata_rata_kalori,
      percentFromLastWeek: 0,
    },
    budget: {
      monthly: {
        remaining: dto.widgets.sisa_anggaran ?? 0,
        status: (dto.widgets.sisa_anggaran ?? 0) > 0 ? "SAFE" : "RISKY",
      },
    },
    publicReviews: {
      total: dto.widgets.total_laporan_masyarakat,
    },
  };

  return {
    sppgName: dto.sppg_name,
    statistics,
    recentReports: dto.riwayat_laporan.map(mapDashboardRecentReportDtoToDomain),
    publicReviews: dto.laporan_masyarakat.map((review) =>
      mapPublicDashboardReviewDtoToDomain({
        ...review,
        author_name: review.school?.school_name ?? "Anonim",
        display_author: review.school?.school_name ?? "Anonim",
        location_name: review.school?.school_name ?? "Sekolah",
      }),
    ),
  };
}

export function mapActiveAccountDtoToDomain(
  dto: ActiveAccountsResponse,
): TAdminActiveAccount {
  return {
    id: dto.id_user,
    username: dto.username,
    role: dto.role,
    createdAt: new Date(dto.createdAt),
  };
}

export function mapPendingAccountDtoToDomain(
  dto: PendingAccountsResponse,
): TAdminPendingAccount {
  return {
    id: dto.id_user,
    username: dto.username,
    role: dto.role,
    createdAt: new Date(dto.createdAt),
    registrationCode: dto.registration_code,
    bgnCode: dto.bgn_code,
  };
}

export function mapAdminDashboardDtoToDomain(
  dto: AdminDashboardResponse,
): TAdminDashboard {
  const warnings: TAdminVendorWarning[] = dto.vendor_warnings.map(
    (warning, index) => ({
      id: String(index + 1),
      name: warning.nama_vendor,
      rating: warning.rating,
      reportsCount: warning.jumlah_laporan,
    }),
  );

  const complaints: TAdminComplaint[] = dto.recent_complaints.map(
    (complaint) => ({
      id: String(complaint.id_review),
      authorName: complaint.reviewer?.username ?? "Anonim",
      title: complaint.title ?? "Keluhan",
      vendorName: complaint.id_sppg ? `SPPG ${complaint.id_sppg}` : "Vendor",
      imageUrl: DEFAULT_ATTACHMENT_URL,
      status: mapReviewStatusToAdminComplaintStatus(complaint.status_review),
    }),
  );

  const statistics: TAdminStatistics = {
    reports: {
      total: dto.statistics.totalReports,
    },
    sppg: {
      total: dto.statistics.totalSppg,
    },
    school: {
      total: dto.statistics.totalSchool,
    },
    public: {
      total: dto.statistics.totalPublic,
    },
    reviews: {
      school: 0,
      public: complaints.length,
      total: complaints.length,
    },
    sppgWarnings: {
      total: warnings.length,
      sppgs: warnings,
    },
  };

  return {
    statistics,
    complaints,
    warnings,
  };
}

export function mapPeriodicReportsDtoToDomain(
  dto: PeriodicReportsResponse,
): TSppgPeriodicReport[] {
  const buckets = new Map<string, TSppgPeriodicReport>();

  for (const report of dto.reports) {
    const date = new Date(report.date_report);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${monthIndex}`;

    if (!buckets.has(key)) {
      const periode = new Intl.DateTimeFormat("id-ID", {
        month: "long",
        year: "numeric",
      }).format(date);
      buckets.set(key, {
        id: key,
        url: `https://example.com/reports/${year}-${String(monthIndex + 1).padStart(2, "0")}.pdf`,
        periode,
        monthIndex,
        status: "VERIFIED",
        totalMeal: 0,
        totalBudget: 0,
      });
    }

    const current = buckets.get(key);

    if (!current) {
      continue;
    }

    current.totalMeal += report.total_portion ?? 0;
    current.totalBudget +=
      report.budgets?.reduce((sum, item) => sum + Number(item.item_price), 0) ??
      0;
  }

  return Array.from(buckets.values()).sort((left, right) => {
    return left.monthIndex - right.monthIndex;
  });
}
