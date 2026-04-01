"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, type DefaultValues } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v3";
import { createIndexedDbDraftStorage } from "@/lib/form-draft/indexeddb-draft-storage";
import type { PersistedDraftEnvelope } from "@/lib/form-draft/types";
import { queryKeys } from "@/lib/query-keys";
import { submitSppgDailyReport } from "@/rpc";
import { usePersistedFormDraft } from "./use-persisted-form-draft";

const supportedAttachmentMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

function hasOnlySupportedAttachments(files: unknown[]) {
  return files.every(
    (file) =>
      file instanceof File &&
      supportedAttachmentMimeTypes.includes(
        file.type as (typeof supportedAttachmentMimeTypes)[number],
      ),
  );
}

export const createReportSchema = z.object({
  tanggalLaporan: z.string().min(1, "Tanggal laporan wajib diisi"),
  namaMenu: z.string().min(3, "Nama menu minimal 3 karakter"),
  waktuMakan: z.string().min(1, "Pilih waktu makan"),
  deskripsi: z.string().optional(),
  fotoMakanan: z
    .array(z.any())
    .min(1, "Wajib mengunggah 1 foto makanan")
    .refine(
      hasOnlySupportedAttachments,
      "Foto makanan harus berupa JPG, PNG, atau WEBP",
    ),
  gizi: z.object({
    energi: z.number({ message: "Wajib diisi" }).min(0),
    protein: z.number({ message: "Wajib diisi" }).min(0),
    lemak: z.number({ message: "Wajib diisi" }).min(0),
    karbohidrat: z.number({ message: "Wajib diisi" }).min(0),
  }),
  rincianAnggaran: z
    .array(
      z.object({
        komponenBiaya: z.string().min(1, "Komponen wajib diisi"),
        biayaSatuan: z.number({ message: "Biaya wajib diisi" }).min(0),
      }),
    )
    .min(1, "Minimal 1 rincian anggaran"),
  buktiAnggaran: z
    .array(z.any())
    .min(1, "Wajib mengunggah bukti anggaran")
    .refine(
      hasOnlySupportedAttachments,
      "Bukti anggaran sementara hanya bisa berupa JPG, PNG, atau WEBP",
    ),
});

export type TCreateReportForm = z.infer<typeof createReportSchema>;

const CREATE_REPORT_FORM_DRAFT_VERSION = 2;

function getTodayDateValue() {
  return new Date().toISOString().slice(0, 10);
}

function createReportFormDefaultValues(): DefaultValues<TCreateReportForm> {
  return {
    tanggalLaporan: getTodayDateValue(),
    namaMenu: "",
    waktuMakan: "",
    deskripsi: "",
    fotoMakanan: [],
    gizi: {
      energi: undefined,
      protein: undefined,
      lemak: undefined,
      karbohidrat: undefined,
    },
    rincianAnggaran: [],
    buktiAnggaran: [],
  };
}

export function usePersistedSppgCreateReportForm() {
  const queryClient = useQueryClient();
  const form = useForm<TCreateReportForm>({
    resolver: zodResolver(createReportSchema),
    defaultValues: createReportFormDefaultValues(),
  });
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = form;

  const draftStorage = useMemo(
    () =>
      createIndexedDbDraftStorage<PersistedDraftEnvelope<TCreateReportForm>>({
        key: "sppg-create-report-form",
      }),
    [],
  );

  const { clearDraft, isHydrating } = usePersistedFormDraft({
    form,
    storage: draftStorage,
    version: CREATE_REPORT_FORM_DRAFT_VERSION,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rincianAnggaran",
  });
  const submitMutation = useMutation({
    mutationFn: async (data: TCreateReportForm) => {
      const formData = new FormData();

      formData.set("date_report", data.tanggalLaporan);
      formData.set("menu_name", data.namaMenu);
      formData.set("meal_time", data.waktuMakan);
      formData.set("energy", String(data.gizi.energi));
      formData.set("protein", String(data.gizi.protein));
      formData.set("fat", String(data.gizi.lemak));
      formData.set("carbohydrate", String(data.gizi.karbohidrat));
      formData.set(
        "budgets",
        JSON.stringify(
          data.rincianAnggaran.map((item) => ({
            item_name: item.komponenBiaya,
            item_price: item.biayaSatuan,
          })),
        ),
      );

      for (const file of [...data.fotoMakanan, ...data.buktiAnggaran]) {
        formData.append("attachments", file);
      }

      return submitSppgDailyReport(formData);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.sppgDashboard.detail(),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.periodicReports.all(),
        }),
      ]);
    },
  });

  const rincianAnggaran = watch("rincianAnggaran") ?? [];
  const totalAnggaranPerPorsi = rincianAnggaran.reduce(
    (acc, curr) => acc + (Number(curr.biayaSatuan) || 0),
    0,
  );

  async function onSubmit(data: TCreateReportForm) {
    try {
      const result = await submitMutation.mutateAsync(data);
      await clearDraft();
      reset(createReportFormDefaultValues());
      toast.success(result.message);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal mengirim laporan harian.",
      );
    }
  }

  return {
    append,
    control,
    errors,
    fields,
    handleSubmit,
    isHydrating,
    isSubmitting: submitMutation.isPending,
    onSubmit,
    register,
    remove,
    totalAnggaranPerPorsi,
  };
}
