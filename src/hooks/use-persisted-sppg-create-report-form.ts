"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, type DefaultValues } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v3";
import { createIndexedDbDraftStorage } from "@/lib/form-draft/indexeddb-draft-storage";
import type { PersistedDraftEnvelope } from "@/lib/form-draft/types";
import { usePersistedFormDraft } from "./use-persisted-form-draft";

export const createReportSchema = z.object({
  namaMenu: z.string().min(3, "Nama menu minimal 3 karakter"),
  waktuMakan: z.string().min(1, "Pilih waktu makan"),
  deskripsi: z.string().optional(),
  fotoMakanan: z.array(z.any()).min(1, "Wajib mengunggah 1 foto makanan"),
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
  buktiAnggaran: z.array(z.any()).min(1, "Wajib mengunggah bukti anggaran"),
});

export type TCreateReportForm = z.infer<typeof createReportSchema>;

const CREATE_REPORT_FORM_DRAFT_VERSION = 1;
const createReportFormDefaultValues: DefaultValues<TCreateReportForm> = {
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

export function usePersistedSppgCreateReportForm() {
  const form = useForm<TCreateReportForm>({
    resolver: zodResolver(createReportSchema),
    defaultValues: createReportFormDefaultValues,
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

  const rincianAnggaran = watch("rincianAnggaran") ?? [];
  const totalAnggaranPerPorsi = rincianAnggaran.reduce(
    (acc, curr) => acc + (Number(curr.biayaSatuan) || 0),
    0,
  );

  async function onSubmit(data: TCreateReportForm) {
    console.log(data);
    await clearDraft();
    reset(createReportFormDefaultValues);
    toast.success("Laporan berhasil dikirim!");
  }

  return {
    append,
    control,
    errors,
    fields,
    handleSubmit,
    isHydrating,
    onSubmit,
    register,
    remove,
    totalAnggaranPerPorsi,
  };
}
