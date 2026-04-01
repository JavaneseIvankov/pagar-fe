"use server";

import { cookies } from "next/headers";
import {
  AUTH_SESSION_COOKIE_NAME,
  parseAuthSessionCookieValue,
} from "@/lib/auth";
import { dto } from "@/lib/api";
import {
  mapReviewSppgTargetDtoToDomain,
  type TReviewSppgTarget,
} from "@/types";
import { createServerApiClient } from "./server-api-client";

type ReviewSubmissionRole = "PUBLIC" | "SCHOOL";

export type CurrentReviewSubmissionContext = {
  role: ReviewSubmissionRole;
  targets: TReviewSppgTarget[];
};

export type SubmitCurrentRoleReviewResult = {
  message: string;
};

async function getCurrentReviewRole(): Promise<ReviewSubmissionRole> {
  const cookieStore = await cookies();
  const session = parseAuthSessionCookieValue(
    cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );

  if (session?.user.role === "PUBLIC" || session?.user.role === "SCHOOL") {
    return session.user.role;
  }

  throw new Error("Halaman ini hanya tersedia untuk akun publik dan sekolah.");
}

function getOptionalAttachment(formData: FormData) {
  const attachment = formData.get("attachment");

  if (!(attachment instanceof File) || attachment.size === 0) {
    return undefined;
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(attachment.type)) {
    throw new Error("Lampiran ulasan harus berupa JPG, PNG, atau WEBP.");
  }

  if (attachment.size > 3 * 1024 * 1024) {
    throw new Error("Ukuran lampiran ulasan maksimal 3MB.");
  }

  return [attachment];
}

function getSingleValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

export async function fetchCurrentReviewSubmissionContext(): Promise<CurrentReviewSubmissionContext> {
  const role = await getCurrentReviewRole();
  const client = createServerApiClient();

  if (role === "PUBLIC") {
    const response = await client.getPublicSppgList();

    return {
      role,
      targets: response.data.map(mapReviewSppgTargetDtoToDomain),
    };
  }

  const response = await client.getSchoolSppgList();

  return {
    role,
    targets: response.data.map(mapReviewSppgTargetDtoToDomain),
  };
}

export async function submitCurrentRoleReview(
  formData: FormData,
): Promise<SubmitCurrentRoleReviewResult> {
  const role = await getCurrentReviewRole();
  const attachment = getOptionalAttachment(formData);
  const input = dto.createPublicReviewBodySchema.parse({
    id_sppg: getSingleValue(formData, "id_sppg"),
    description: getSingleValue(formData, "description"),
    rating_score: Number(getSingleValue(formData, "rating_score")),
  });
  const client = createServerApiClient();

  if (role === "PUBLIC") {
    const response = await client.createPublicReview({
      body: input,
      files: {
        attachments: attachment,
      },
    });

    return {
      message: `Ulasan berhasil dikirim dengan ID ${response.data.id_review}.`,
    };
  }

  const response = await client.createSchoolReview({
    body: input,
    files: {
      attachments: attachment,
    },
  });

  return {
    message: `Ulasan berhasil dikirim dengan ID ${response.data.id_review}.`,
  };
}
