import { delayedValue } from "@/lib/utils";
import {
  getPublicDashboardReviewsSuccessResponseSchema,
  getPublicDashboardSppgReportsSuccessResponseSchema,
  getSppgDailyReportByIdSuccessResponseSchema,
} from "@/lib/api/dto";
import {
  mapPublicDashboardReviewDtoToDomain,
  mapPublicDashboardSppgReportDtoToDomain,
  mapSppgDailyReportDetailDtoToDomain,
  type TPublicReview,
  type TSppgReport,
  type TSppgReportDetail,
} from "@/types";
import {
  buildFallbackBudgetDetailResponse,
  buildPublicDashboardReviewsResponse,
  buildPublicDashboardSppgReportsResponse,
  buildSppgDailyReportByIdResponse,
} from "./mock-backend";

export async function fetchSppgReports(): Promise<TSppgReport[]> {
  const rawData = await delayedValue(
    buildPublicDashboardSppgReportsResponse(),
    300,
  );
  const dto = getPublicDashboardSppgReportsSuccessResponseSchema.parse(rawData);

  return dto.data.map(mapPublicDashboardSppgReportDtoToDomain);
}

export async function fetchPublicReviews(): Promise<TPublicReview[]> {
  const rawData = await delayedValue(
    buildPublicDashboardReviewsResponse(),
    300,
  );
  const dto = getPublicDashboardReviewsSuccessResponseSchema.parse(rawData);

  return dto.data.map(mapPublicDashboardReviewDtoToDomain);
}

export async function fetchSppgReportDetail(
  id: string,
): Promise<TSppgReportDetail | null> {
  const payload =
    buildSppgDailyReportByIdResponse(id) ?? buildFallbackBudgetDetailResponse();
  const rawData = await delayedValue(payload, 300);
  const dto = getSppgDailyReportByIdSuccessResponseSchema.parse(rawData);
  const detail = mapSppgDailyReportDetailDtoToDomain(dto.data);

  if (!buildSppgDailyReportByIdResponse(id)) {
    return null;
  }

  const reports = await fetchSppgReports();

  return {
    ...detail,
    author: reports.find((report) => report.id === id)?.author ?? detail.author,
    relatedReports: reports.filter((report) => report.id !== id).slice(0, 2),
  };
}
