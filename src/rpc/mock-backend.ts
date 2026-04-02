import type { z } from "zod/v3";
import type {
  getActiveAccountsSuccessResponseSchema,
  getAdminDashboardSuccessResponseSchema,
  getPendingAccountsSuccessResponseSchema,
  getPublicDashboardReviewsSuccessResponseSchema,
  getPublicDashboardSppgReportsSuccessResponseSchema,
  getSchoolProfileSuccessResponseSchema,
  getSppgDailyReportByIdSuccessResponseSchema,
  getSppgDashboardSuccessResponseSchema,
  getSppgPeriodicReportsSuccessResponseSchema,
  updateAccountStatusBodySchema,
  updateAccountStatusSuccessResponseSchema,
} from "@/lib/api/dto";
import {
  adminStatistics,
  budgets,
  publicReviews,
  schools,
  sppgPeriodicReports,
  sppgReportDetails,
  sppgReports,
  sppgStatistics,
  sppgs,
} from "@/mock-data";

type PublicDashboardSppgReportsResponse = z.infer<
  typeof getPublicDashboardSppgReportsSuccessResponseSchema
>;
type PublicDashboardReviewResponse = z.infer<
  typeof getPublicDashboardReviewsSuccessResponseSchema
>;
type SppgDailyReportByIdResponse = z.infer<
  typeof getSppgDailyReportByIdSuccessResponseSchema
>;
type SppgDashboardResponse = z.infer<
  typeof getSppgDashboardSuccessResponseSchema
>;
type AdminDashboardResponse = z.infer<
  typeof getAdminDashboardSuccessResponseSchema
>;
type SppgPeriodicReportsResponse = z.infer<
  typeof getSppgPeriodicReportsSuccessResponseSchema
>;
type SchoolProfileResponse = z.infer<
  typeof getSchoolProfileSuccessResponseSchema
>;
type ActiveAccountsResponse = z.infer<
  typeof getActiveAccountsSuccessResponseSchema
>;
type PendingAccountsResponse = z.infer<
  typeof getPendingAccountsSuccessResponseSchema
>;
type UpdateAccountStatusBody = z.infer<typeof updateAccountStatusBodySchema>;
type UpdateAccountStatusResponse = z.infer<
  typeof updateAccountStatusSuccessResponseSchema
>;

type PublicDashboardSppgReportItem =
  PublicDashboardSppgReportsResponse["data"][number];
type PublicDashboardReviewItem = PublicDashboardReviewResponse["data"][number];
type SppgDashboardWidgets = SppgDashboardResponse["data"]["widgets"];
type SppgDashboardHistoryItem =
  SppgDashboardResponse["data"]["riwayat_laporan"][number];
type SppgDashboardReviewItem =
  SppgDashboardResponse["data"]["laporan_masyarakat"][number];
type AdminComplaintItem =
  AdminDashboardResponse["data"]["recent_complaints"][number];
type AdminVendorWarningItem =
  AdminDashboardResponse["data"]["vendor_warnings"][number];
type PeriodicReportItem =
  SppgPeriodicReportsResponse["data"]["reports"][number];
type DailyReportRecord = Omit<
  SppgDailyReportByIdResponse["data"],
  "attachments" | "budgets"
>;
type BudgetRecord = NonNullable<
  SppgDailyReportByIdResponse["data"]["budgets"]
>[number];
type AttachmentRecord = NonNullable<
  SppgDailyReportByIdResponse["data"]["attachments"]
>[number];
type ActiveAccountRecord = ActiveAccountsResponse["data"][number];
type PendingAccountRecord = PendingAccountsResponse["data"][number];

function createUserUuid(index: number) {
  return `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`;
}

function createEntityUuid(index: number) {
  return `10000000-0000-4000-8000-${String(index).padStart(12, "0")}`;
}

function asEntityUuid(value: number | string) {
  return typeof value === "string" ? value : createEntityUuid(value);
}

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function toIsoDate(date: Date) {
  return date.toISOString();
}

function createActiveAccountRecord(params: {
  bgnCode?: string | null;
  createdAt: string;
  email?: string;
  id: number;
  registrationCode?: string | null;
  role: ActiveAccountRecord["role"];
  username: string;
}): ActiveAccountRecord {
  return {
    id_user: createUserUuid(params.id),
    username: params.username,
    email: params.email ?? `${params.username}@pagar.app`,
    role: params.role,
    registration_code: params.registrationCode ?? null,
    bgn_code: params.bgnCode ?? null,
    createdAt: params.createdAt,
  } satisfies ActiveAccountRecord;
}

function createPendingAccountRecord(params: {
  bgnCode: string | null;
  createdAt: string;
  email?: string;
  id: number;
  registrationCode: string | null;
  role: PendingAccountRecord["role"];
  username: string;
}): PendingAccountRecord {
  return {
    id_user: createUserUuid(params.id),
    username: params.username,
    email: params.email ?? `${params.username}@pagar.app`,
    role: params.role,
    registration_code: params.registrationCode,
    bgn_code: params.bgnCode,
    createdAt: params.createdAt,
  } satisfies PendingAccountRecord;
}

const initialActiveAccounts: ActiveAccountRecord[] = [
  createActiveAccountRecord({
    id: 501,
    username: schools[0]?.username ?? "sdn-kauman-1",
    role: "SCHOOL",
    createdAt: "2026-03-05T08:00:00.000Z",
  }),
  createActiveAccountRecord({
    id: 502,
    username: schools[1]?.username ?? "smpn-3-malang",
    role: "SCHOOL",
    createdAt: "2026-03-08T09:30:00.000Z",
  }),
  createActiveAccountRecord({
    id: 503,
    username: sppgs[0]?.username ?? "sppg-berkah-nutrisi",
    role: "SPPG",
    createdAt: "2026-03-10T10:15:00.000Z",
  }),
];

const initialPendingAccounts: PendingAccountRecord[] = [
  createPendingAccountRecord({
    id: 601,
    username: sppgs[1]?.username ?? "sppg-sehat-bersama",
    role: "SPPG",
    registrationCode: "REG-SPPG-002",
    bgnCode: "BGN-SPPG-002",
    createdAt: "2026-03-21T03:00:00.000Z",
  }),
  createPendingAccountRecord({
    id: 602,
    username: sppgs[2]?.username ?? "sppg-gizi-nusantara",
    role: "SPPG",
    registrationCode: "REG-SPPG-003",
    bgnCode: "BGN-SPPG-003",
    createdAt: "2026-03-22T04:20:00.000Z",
  }),
  createPendingAccountRecord({
    id: 603,
    username: "sdn-blimbing-2",
    role: "SCHOOL",
    registrationCode: null,
    bgnCode: "BGN-SCHOOL-014",
    createdAt: "2026-03-23T01:10:00.000Z",
  }),
];

let mockActiveAccounts = [...initialActiveAccounts];
let mockPendingAccounts = [...initialPendingAccounts];

function createAttachmentRecord(params: {
  id: number;
  entityId: number | string;
  url: string;
  fileType: string | null;
  category: string | null;
  createdAt: string;
}): AttachmentRecord {
  return {
    id_attachment: createEntityUuid(params.id),
    entity_type: "daily_report",
    id_entity: asEntityUuid(params.entityId),
    file_url: params.url,
    file_type: params.fileType,
    file_size: null,
    file_category: params.category,
    createdAt: params.createdAt,
    updatedAt: params.createdAt,
  } satisfies AttachmentRecord;
}

function createBudgetRecord(params: {
  id: number;
  reportId: number | string;
  itemName: string;
  itemPrice: number;
  createdAt: string;
}): BudgetRecord {
  return {
    id_budget: createEntityUuid(params.id),
    id_daily_report: asEntityUuid(params.reportId),
    item_name: params.itemName,
    item_price: params.itemPrice,
    createdAt: params.createdAt,
    updatedAt: params.createdAt,
  } satisfies BudgetRecord;
}

function createDailyReportRecord(
  report: (typeof sppgReports)[number],
  index: number,
): DailyReportRecord {
  return {
    id_daily_report: createEntityUuid(index + 1),
    id_sppg: createEntityUuid(index + 101),
    date_report: toDateOnly(report.postedAt),
    menu_name: report.title,
    meal_time: report.mealTime,
    total_portion: 1500,
    menu_description: report.content,
    total_expense: budgets[index]?.totalPrice ?? 0,
    energy: report.nutritionalFacts.calories.inKcal,
    protein: report.nutritionalFacts.proteinGrams.inGrams,
    fat: report.nutritionalFacts.fatGrams.inGrams,
    carbohydrate: report.nutritionalFacts.carbGrams.inGrams,
    createdAt: toIsoDate(report.postedAt),
    updatedAt: toIsoDate(report.postedAt),
  } satisfies DailyReportRecord;
}

export function buildPublicDashboardSppgReportsResponse(): PublicDashboardSppgReportsResponse {
  const data = sppgReports.map((report, index) => {
    return {
      ...createDailyReportRecord(report, index),
      sppg: {
        sppg_name: report.author.sppgName,
        sppg_address: report.author.address,
      },
      attachments: [
        {
          file_url: report.imageUrl,
        },
      ],
    } satisfies PublicDashboardSppgReportItem;
  });

  return {
    status: "success" as const,
    data,
    meta: {
      totalItems: data.length,
      totalPages: 1,
      currentPage: 1,
      limit: data.length,
    },
  } satisfies PublicDashboardSppgReportsResponse;
}

export function buildPublicDashboardReviewsResponse(): PublicDashboardReviewResponse {
  const data = publicReviews.map((review, index) => {
    return {
      id_review: createEntityUuid(index + 201),
      id_sppg: createEntityUuid(index + 101),
      id_school: null,
      id_user: createUserUuid(index + 100),
      is_anonymous: true,
      title: review.title,
      description: review.content,
      rating_score: Math.round(review.ratingScore),
      status_review: "SELESAI" as const,
      createdAt: toIsoDate(review.postedAt),
      updatedAt: toIsoDate(review.postedAt),
      school: null,
      sppg: {
        sppg_name: review.forSppg.sppgName,
      },
      attachments: [
        {
          file_url: review.imageUrl,
        },
      ],
      school_name: review.forSppg.sppgName,
      author_name: review.reporterName,
      display_author: review.reporterName,
    } satisfies PublicDashboardReviewItem;
  });

  return {
    status: "success" as const,
    data,
    meta: {
      totalItems: data.length,
      totalPages: 1,
      currentPage: 1,
      limit: data.length,
    },
  } satisfies PublicDashboardReviewResponse;
}

export function buildSppgDailyReportByIdResponse(
  id: string,
): SppgDailyReportByIdResponse | null {
  const reportIndex = sppgReportDetails.findIndex((_item, index) => {
    return createEntityUuid(index + 1) === id;
  });
  const report = reportIndex >= 0 ? sppgReportDetails[reportIndex] : null;

  if (!report) {
    return null;
  }

  const reportId = id;

  return {
    status: "success" as const,
    data: {
      ...createDailyReportRecord(report, reportIndex),
      budgets: report.budget.items.map((item, index) =>
        createBudgetRecord({
          id: index + 1,
          reportId,
          itemName: item.name,
          itemPrice: item.price,
          createdAt: toIsoDate(report.postedAt),
        }),
      ),
      attachments: report.budget.attachments.map((attachment, index) =>
        createAttachmentRecord({
          id: index + 1,
          entityId: reportId,
          url: attachment.url,
          fileType: attachment.mimeType,
          category: attachment.label,
          createdAt: toIsoDate(report.postedAt),
        }),
      ),
    },
  } satisfies SppgDailyReportByIdResponse;
}

export function buildSppgDashboardResponse(): SppgDashboardResponse {
  return {
    status: "success" as const,
    data: {
      sppg_name: sppgs[0].sppgName,
      widgets: {
        status_hari_ini: sppgStatistics.isDailyReportSubmitted
          ? "SELESAI"
          : "BELUM",
        rata_rata_kalori: sppgStatistics.weeklyCalories.average,
        sisa_anggaran: sppgStatistics.budget.monthly.remaining,
        total_laporan_masyarakat: sppgStatistics.publicReviews.total,
      } satisfies SppgDashboardWidgets,
      riwayat_laporan: sppgReports.map((report, index) => {
        return {
          id_daily_report: createEntityUuid(index + 1),
          menu_name: report.title,
          date_report: toDateOnly(report.postedAt),
        } satisfies SppgDashboardHistoryItem;
      }),
      laporan_masyarakat: publicReviews.map((review, index) => {
        return {
          id_review: createEntityUuid(index + 301),
          id_sppg: createEntityUuid(index + 101),
          id_school: createEntityUuid(index + 401),
          id_user: createUserUuid(index + 100),
          is_anonymous: true,
          title: review.title,
          description: review.content,
          rating_score: Math.round(review.ratingScore),
          status_review: "MENUNGGU" as const,
          createdAt: toIsoDate(review.postedAt),
          updatedAt: toIsoDate(review.postedAt),
          school: {
            school_name:
              schools[index % schools.length]?.schoolName ?? "Sekolah",
          },
          attachments: [
            {
              file_url: review.imageUrl,
            },
          ],
        } satisfies SppgDashboardReviewItem;
      }),
    },
  } satisfies SppgDashboardResponse;
}

export function buildAdminDashboardResponse(): AdminDashboardResponse {
  return {
    status: "success" as const,
    data: {
      statistics: {
        totalReports: adminStatistics.reports.total,
        totalSppg: adminStatistics.sppg.total,
        totalSchool: adminStatistics.school.total,
        totalPublic: adminStatistics.public.total,
      },
      recent_complaints: [
        {
          id_review: createEntityUuid(501),
          id_sppg: createEntityUuid(101),
          id_school: null,
          id_user: createUserUuid(201),
          is_anonymous: false,
          title: "Sayuran kurang matang",
          description: "Sayuran kurang matang",
          rating_score: 2,
          status_review: "MENUNGGU" as const,
          createdAt: "2026-03-20T08:00:00.000Z",
          updatedAt: "2026-03-20T08:00:00.000Z",
          user: {
            username: "Rasya Fariz",
          },
        } satisfies AdminComplaintItem,
        {
          id_review: createEntityUuid(502),
          id_sppg: createEntityUuid(102),
          id_school: createEntityUuid(401),
          id_user: createUserUuid(202),
          is_anonymous: false,
          title: "Nasi keras & kurang banyak",
          description: "Nasi keras & kurang banyak",
          rating_score: 2,
          status_review: "INVESTIGASI" as const,
          createdAt: "2026-03-21T08:00:00.000Z",
          updatedAt: "2026-03-21T08:00:00.000Z",
          user: {
            username: "SDN 01 Malang",
          },
        } satisfies AdminComplaintItem,
        {
          id_review: createEntityUuid(503),
          id_sppg: createEntityUuid(101),
          id_school: null,
          id_user: createUserUuid(203),
          is_anonymous: false,
          title: "Hambar & bumbu tidak meresap",
          description: "Hambar & bumbu tidak meresap",
          rating_score: 1,
          status_review: "SELESAI" as const,
          createdAt: "2026-03-22T08:00:00.000Z",
          updatedAt: "2026-03-22T08:00:00.000Z",
          user: {
            username: "Jule",
          },
        } satisfies AdminComplaintItem,
      ],
      vendor_warnings: adminStatistics.sppgWarnings.sppgs.map((warning) => {
        return {
          nama_vendor: warning.name,
          rating: warning.rating,
          jumlah_laporan: warning.reportsCount,
        } satisfies AdminVendorWarningItem;
      }),
    },
  } satisfies AdminDashboardResponse;
}

export function buildActiveAccountsResponse(): ActiveAccountsResponse {
  return {
    status: "success" as const,
    totalItems: mockActiveAccounts.length,
    totalPages: 1,
    currentPage: 1,
    data: mockActiveAccounts.map((account) => ({ ...account })),
  } satisfies ActiveAccountsResponse;
}

export function buildPendingAccountsResponse(): PendingAccountsResponse {
  return {
    status: "success" as const,
    totalItems: mockPendingAccounts.length,
    totalPages: 1,
    currentPage: 1,
    data: mockPendingAccounts.map((account) => ({ ...account })),
  } satisfies PendingAccountsResponse;
}

export function updateMockAccountStatus(params: {
  idUser: string;
  status: UpdateAccountStatusBody["status"];
}): UpdateAccountStatusResponse {
  const pendingAccount = mockPendingAccounts.find(
    (account) => account.id_user === params.idUser,
  );

  if (!pendingAccount) {
    throw new Error("Akun tidak ditemukan dalam antrean validasi.");
  }

  mockPendingAccounts = mockPendingAccounts.filter(
    (account) => account.id_user !== params.idUser,
  );

  if (params.status === "APPROVED") {
    mockActiveAccounts = [
      createActiveAccountRecord({
        id: Number(params.idUser.slice(-12)),
        username: pendingAccount.username,
        email: pendingAccount.email,
        role: pendingAccount.role,
        registrationCode: pendingAccount.registration_code,
        bgnCode: pendingAccount.bgn_code,
        createdAt: pendingAccount.createdAt,
      }),
      ...mockActiveAccounts,
    ];
  }

  return {
    status: "success" as const,
    message: "Status akun berhasil diperbarui",
    data: {
      id_user: params.idUser,
      account_status: params.status,
    },
  } satisfies UpdateAccountStatusResponse;
}

export function buildSppgPeriodicReportsResponse(): SppgPeriodicReportsResponse {
  const totalItems = sppgPeriodicReports.length;

  return {
    status: "success" as const,
    data: {
      period: {
        start_date: "2024-01-01",
        end_date: "2024-09-30",
      },
      total_budget_spent: sppgPeriodicReports.reduce(
        (sum, report) => sum + report.totalBudget,
        0,
      ),
      pagination: {
        totalItems,
        totalPages: totalItems > 0 ? 1 : 0,
        currentPage: totalItems > 0 ? 1 : 0,
      },
      reports: sppgPeriodicReports.map((report, index) => {
        return {
          id_daily_report: createEntityUuid(index + 601),
          id_sppg: createEntityUuid(101),
          date_report: `2024-${String(report.monthIndex + 1).padStart(2, "0")}-01`,
          menu_name: `Rekap ${report.periode}`,
          meal_time: "Makan Siang",
          total_portion: report.totalMeal,
          menu_description: `Ringkasan laporan ${report.periode}`,
          total_expense: report.totalBudget,
          energy: 0,
          protein: 0,
          fat: 0,
          carbohydrate: 0,
          createdAt: `2024-${String(report.monthIndex + 1).padStart(2, "0")}-01T00:00:00.000Z`,
          updatedAt: `2024-${String(report.monthIndex + 1).padStart(2, "0")}-01T00:00:00.000Z`,
          budgets: [
            createBudgetRecord({
              id: index + 1,
              reportId: index + 1,
              itemName: "Total Anggaran Bulanan",
              itemPrice: report.totalBudget,
              createdAt: `2024-${String(report.monthIndex + 1).padStart(2, "0")}-01T00:00:00.000Z`,
            }),
          ],
        } satisfies PeriodicReportItem;
      }),
    },
  } satisfies SppgPeriodicReportsResponse;
}

export function buildFallbackBudgetDetailResponse(): SppgDailyReportByIdResponse {
  const report = sppgReportDetails[0];

  return {
    status: "success" as const,
    data: {
      ...createDailyReportRecord(report, 0),
      budgets: budgets[0].items.map((item, index) =>
        createBudgetRecord({
          id: index + 1,
          reportId: 1,
          itemName: item.name,
          itemPrice: item.price,
          createdAt: toIsoDate(report.postedAt),
        }),
      ),
      attachments: budgets[0].attachments.map((attachment, index) =>
        createAttachmentRecord({
          id: index + 1,
          entityId: 1,
          url: attachment.url,
          fileType: attachment.mimeType,
          category: attachment.label,
          createdAt: toIsoDate(report.postedAt),
        }),
      ),
    },
  } satisfies SppgDailyReportByIdResponse;
}

export function buildSchoolProfileResponse(): SchoolProfileResponse {
  return {
    status: "success" as const,
    data: {
      id_school: createEntityUuid(701),
      id_user: createUserUuid(301),
      school_name: schools[0].schoolName,
      school_address: schools[0].address,
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: "2026-03-20T00:00:00.000Z",
    },
  } satisfies SchoolProfileResponse;
}
