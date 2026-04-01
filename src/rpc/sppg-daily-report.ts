"use server";

import { API_REQUEST_FAILED_MESSAGE, dto } from "@/lib/api";
import { createServerRpc } from "./server-rpc";

export type SubmitSppgDailyReportResult = {
  id: string;
  message: string;
  totalExpense: number;
};

function getSingleValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function ensureSupportedImageAttachments(attachments: File[]) {
  if (attachments.length === 0 || attachments.length > 2) {
    throw new Error("Lampiran laporan harian harus berjumlah 1 sampai 2 file.");
  }

  for (const attachment of attachments) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(attachment.type)) {
      throw new Error("Lampiran hanya boleh berupa JPG, PNG, atau WEBP.");
    }

    if (attachment.size > 3 * 1024 * 1024) {
      throw new Error("Ukuran setiap lampiran maksimal 3MB.");
    }
  }
}

function getAttachments(formData: FormData) {
  const attachments = formData
    .getAll("attachments")
    .filter((value): value is File => value instanceof File && value.size > 0);

  ensureSupportedImageAttachments(attachments);

  return attachments;
}

export const submitSppgDailyReport = createServerRpc(
  {
    operation: "submitSppgDailyReport",
  },
  async (
    { client, parse },
    formData: FormData,
  ): Promise<SubmitSppgDailyReportResult> => {
    const attachments = getAttachments(formData);
    const parsedPayload = parse(
      dto.createSppgDailyReportBodySchema,
      {
        date_report: getSingleValue(formData, "date_report"),
        menu_name: getSingleValue(formData, "menu_name"),
        meal_time: getSingleValue(formData, "meal_time"),
        total_portion: Number(getSingleValue(formData, "total_portion")),
        energy: Number(getSingleValue(formData, "energy")),
        protein: Number(getSingleValue(formData, "protein")),
        fat: Number(getSingleValue(formData, "fat")),
        carbohydrate: Number(getSingleValue(formData, "carbohydrate")),
        budgets: JSON.parse(getSingleValue(formData, "budgets") || "[]"),
      },
      "payload",
      API_REQUEST_FAILED_MESSAGE,
    );
    const response = await client.createSppgDailyReport({
      body: parsedPayload,
      files: {
        attachments,
      },
    });

    return {
      id: response.data.id_daily_report,
      message: response.message,
      totalExpense: response.data.total_expense,
    };
  },
);
