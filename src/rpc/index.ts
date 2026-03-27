import { delayedValue } from "@/lib/utils";
import * as types from "@/types";
import {
  buildAdminDashboardResponse,
  buildFallbackBudgetDetailResponse,
  buildPublicDashboardReviewsResponse,
  buildPublicDashboardSppgReportsResponse,
  buildSchoolProfileResponse,
  buildSppgDailyReportByIdResponse,
  buildSppgDashboardResponse,
  buildSppgPeriodicReportsResponse,
} from "./mock-backend";

export async function fetchAdminDashboard(): Promise<types.TAdminDashboard> {
  const rawData = await delayedValue(buildAdminDashboardResponse(), 300);
  const dto = types.getAdminDashboardSuccessResponseSchema.parse(rawData);

  return types.mapAdminDashboardDtoToDomain(dto.data);
}

export async function fetchSppgPeriodicReports(): Promise<
  types.TSppgPeriodicReport[]
> {
  const rawData = await delayedValue(buildSppgPeriodicReportsResponse(), 300);
  const dto = types.getSppgPeriodicReportsSuccessResponseSchema.parse(rawData);

  return types.mapPeriodicReportsDtoToDomain(dto.data);
}

export async function fetchCurrentProfile(): Promise<types.TSchool> {
  const rawData = await delayedValue(buildSchoolProfileResponse(), 300);
  const dto = types.getSchoolProfileSuccessResponseSchema.parse(rawData);

  return {
    id: dto.data.id_user,
    role: "SCHOOL",
    username: `school-${dto.data.id_school}`,
    schoolId: String(dto.data.id_school),
    schoolName: dto.data.school_name,
    address: dto.data.school_address ?? "",
  };
}

export async function fetchSppgReports(): Promise<types.TSppgReport[]> {
  const rawData = await delayedValue(
    buildPublicDashboardSppgReportsResponse(),
    300,
  );
  const dto =
    types.getPublicDashboardSppgReportsSuccessResponseSchema.parse(rawData);

  return dto.data.map(types.mapPublicDashboardSppgReportDtoToDomain);
}

export async function fetchPublicReviews(): Promise<types.TPublicReview[]> {
  const rawData = await delayedValue(
    buildPublicDashboardReviewsResponse(),
    300,
  );
  const dto =
    types.getPublicDashboardReviewsSuccessResponseSchema.parse(rawData);

  return dto.data.map(types.mapPublicDashboardReviewDtoToDomain);
}

export async function fetchSppgReportDetail(
  id: string,
): Promise<types.TSppgReportDetail | null> {
  const payload =
    buildSppgDailyReportByIdResponse(id) ?? buildFallbackBudgetDetailResponse();
  const rawData = await delayedValue(payload, 300);
  const dto = types.getSppgDailyReportByIdSuccessResponseSchema.parse(rawData);
  const detail = types.mapSppgDailyReportDetailDtoToDomain(dto.data);

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

export async function fetchSppgDashboard(): Promise<types.TSppgDashboard> {
  const rawData = await delayedValue(buildSppgDashboardResponse(), 300);
  const dto = types.getSppgDashboardSuccessResponseSchema.parse(rawData);

  return types.mapSppgDashboardDtoToDomain(dto.data);
}
