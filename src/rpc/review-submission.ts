"use server";

import { API_REQUEST_FAILED_MESSAGE, dto } from "@/lib/api";
import { requireCurrentRole } from "@/lib/auth/server";
import {
  mapReviewSppgTargetDtoToDomain,
  type TReviewSppgTarget,
} from "@/types";
import { createServerRpc } from "./server-rpc";

type ReviewSubmissionRole = "PUBLIC" | "SCHOOL";

export type CurrentReviewSubmissionContext = {
  role: ReviewSubmissionRole;
  targets: TReviewSppgTarget[];
};

export type SubmitCurrentRoleReviewResult = {
  message: string;
};

async function getCurrentReviewRole(): Promise<ReviewSubmissionRole> {
  const session = await requireCurrentRole(
    ["PUBLIC", "SCHOOL"],
    "Halaman ini hanya tersedia untuk akun publik dan sekolah.",
  );

  return session.user.role;
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

export const fetchCurrentReviewSubmissionContext = createServerRpc(
  {
    operation: "fetchCurrentReviewSubmissionContext",
  },
  async ({ client }): Promise<CurrentReviewSubmissionContext> => {
    const role = await getCurrentReviewRole();

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
  },
);

export const submitCurrentRoleReview = createServerRpc(
  {
    operation: "submitCurrentRoleReview",
  },
  async (
    { client, parse },
    formData: FormData,
  ): Promise<SubmitCurrentRoleReviewResult> => {
    const role = await getCurrentReviewRole();
    const attachment = getOptionalAttachment(formData);
    const input = parse(
      dto.createPublicReviewBodySchema,
      {
        id_sppg: getSingleValue(formData, "id_sppg"),
        title: getSingleValue(formData, "title"),
        description: getSingleValue(formData, "description"),
        rating_score: Number(getSingleValue(formData, "rating_score")),
      },
      "payload",
      API_REQUEST_FAILED_MESSAGE,
    );

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
  },
);
