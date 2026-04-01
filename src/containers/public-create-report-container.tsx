"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod/v3";
import {
  CreateReportForm,
  type PublicCreateReportFormValues,
} from "@/components/reports/create-report-form";
import {
  useCurrentReviewSubmissionContext,
  useSubmitCurrentRoleReview,
} from "@/hooks/use-review-submission";

const formSchema = z.object({
  photo: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        (file instanceof File &&
          ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
          file.size <= 3 * 1024 * 1024),
      "Lampiran harus berupa JPG, PNG, atau WEBP dengan ukuran maksimal 3MB",
    ),
  rating: z
    .number()
    .min(1, "Berikan penilaian kualitas makanan (minimal 1 bintang)"),
  title: z
    .string()
    .min(1, "Judul laporan wajib diisi")
    .max(255, "Judul laporan maksimal 255 karakter"),
  details: z.string().min(10, "Ulasan minimal 10 karakter"),
  sppgId: z.string().uuid("Pilih SPPG tujuan yang valid"),
});

// TASK: make this component accept initial data, it should prefill sppgId once the detail/link flow is clarified.

export function PublicCreateReportContainer() {
  const reviewSubmissionContextQuery = useCurrentReviewSubmissionContext();
  const submitReviewMutation = useSubmitCurrentRoleReview();
  const {
    clearErrors,
    setError,
    watch,
    reset,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<PublicCreateReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      title: "",
      details: "",
      sppgId: "",
    },
  });
  const selectedSppgId = watch("sppgId");
  const selectedTarget = useMemo(
    () =>
      reviewSubmissionContextQuery.data?.targets.find(
        (target) => target.id === selectedSppgId,
      ),
    [reviewSubmissionContextQuery.data?.targets, selectedSppgId],
  );

  const onSubmit = async (data: PublicCreateReportFormValues) => {
    try {
      const formData = new FormData();

      formData.set("id_sppg", data.sppgId);
      formData.set("title", data.title);
      formData.set("description", data.details);
      formData.set("rating_score", String(data.rating));

      if (data.photo) {
        formData.set("attachment", data.photo);
      }

      const result = await submitReviewMutation.mutateAsync(formData);
      reset({
        rating: 0,
        title: "",
        details: "",
        sppgId: "",
        photo: undefined,
      });
      toast.success(result.message);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal mengirim laporan.",
      );
    }
  };

  if (reviewSubmissionContextQuery.isLoading) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-white/70 px-6 py-12 text-center text-muted-foreground">
        Memuat daftar SPPG tujuan...
      </div>
    );
  }

  if (
    reviewSubmissionContextQuery.isError ||
    !reviewSubmissionContextQuery.data
  ) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center text-destructive">
        Gagal memuat daftar SPPG tujuan.
      </div>
    );
  }

  return (
    <CreateReportForm
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      isLoadingTargets={reviewSubmissionContextQuery.isLoading}
      isSubmitting={submitReviewMutation.isPending}
      onPhotoReject={(message) =>
        setError("photo", { type: "manual", message })
      }
      onPhotoSelect={() => clearErrors("photo")}
      onSubmit={onSubmit}
      register={register}
      selectedTarget={selectedTarget}
      targets={reviewSubmissionContextQuery.data.targets}
    />
  );
}
