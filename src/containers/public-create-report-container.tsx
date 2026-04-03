"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
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
import { handleClientApiError } from "@/lib/api/client-error-handling";

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

export interface PublicCreateReportContainerProps {
  initialSppgId?: string;
}

export function PublicCreateReportContainer({
  initialSppgId,
}: PublicCreateReportContainerProps) {
  const reviewSubmissionContextQuery = useCurrentReviewSubmissionContext();
  const submitReviewMutation = useSubmitCurrentRoleReview();
  const {
    clearErrors,
    setError,
    setValue,
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

  useEffect(() => {
    if (!initialSppgId || selectedSppgId) {
      return;
    }

    const normalizedInitialId = initialSppgId.trim();

    if (!normalizedInitialId) {
      return;
    }

    const hasTarget = reviewSubmissionContextQuery.data?.targets.some(
      (target) => String(target.id) === normalizedInitialId,
    );

    if (!hasTarget) {
      return;
    }

    setValue("sppgId", normalizedInitialId, {
      shouldDirty: false,
      shouldValidate: true,
    });
  }, [
    initialSppgId,
    reviewSubmissionContextQuery.data?.targets,
    selectedSppgId,
    setValue,
  ]);

  const _onSubmit = async (data: PublicCreateReportFormValues) => {
    const formData = new FormData();

    formData.set("id_sppg", data.sppgId);
    formData.set("title", data.title);
    formData.set("description", data.details);
    formData.set("rating_score", String(data.rating));

    if (data.photo) {
      formData.set("attachment", data.photo);
    }

    submitReviewMutation.mutate(formData, {
      onSuccess: (result) => {
        reset({
          rating: 0,
          title: "",
          details: "",
          sppgId: "",
          photo: undefined,
        });
        toast.success(result.message);
      },
      onError: (error) => {
        if (handleClientApiError(error)) {
          return;
        }

        toast.error(
          error instanceof Error ? error.message : "Gagal mengirim laporan.",
        );
      },
    });
  };

  return (
    <CreateReportForm
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      isSubmitting={submitReviewMutation.isPending}
      onRetryTargets={() => {
        void reviewSubmissionContextQuery.refetch();
      }}
      onPhotoReject={(message) =>
        setError("photo", { type: "manual", message })
      }
      onPhotoSelect={() => clearErrors("photo")}
      onSubmit={_onSubmit}
      register={register}
      selectedTarget={selectedTarget}
      targets={reviewSubmissionContextQuery.data?.targets ?? []}
      targetsError={
        reviewSubmissionContextQuery.isError
          ? "Gagal memuat daftar SPPG tujuan."
          : null
      }
      targetsLoading={reviewSubmissionContextQuery.isLoading}
    />
  );
}
