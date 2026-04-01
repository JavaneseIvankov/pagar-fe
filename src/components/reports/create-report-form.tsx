"use client";

import { Location01Icon, Navigation03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import StarRating from "@/components/reports/star-rating";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { TReviewSppgTarget } from "@/types";

export interface PublicCreateReportFormValues {
  photo?: File;
  rating: number;
  details: string;
  sppgId: string;
}

interface PublicCreateReportFormProps {
  control: Control<PublicCreateReportFormValues>;
  errors: FieldErrors<PublicCreateReportFormValues>;
  handleSubmit: UseFormHandleSubmit<PublicCreateReportFormValues>;
  isLoadingTargets?: boolean;
  isSubmitting?: boolean;
  onSubmit: SubmitHandler<PublicCreateReportFormValues>;
  register: UseFormRegister<PublicCreateReportFormValues>;
  selectedTarget?: TReviewSppgTarget;
  targets: TReviewSppgTarget[];
}

export function CreateReportForm({
  control,
  errors,
  handleSubmit,
  isLoadingTargets = false,
  isSubmitting = false,
  onSubmit,
  register,
  selectedTarget,
  targets,
}: PublicCreateReportFormProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-4xl space-y-8"
    >
      <FieldGroup className="space-y-8">
        <Field data-invalid={!!errors.photo}>
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <FileUpload
                maxFiles={1}
                maxSizeMB={10}
                value={field.value ? [field.value] : []}
                onChange={(files) => field.onChange(files[0])}
              />
            )}
          />
          {errors.photo && (
            <FieldError>{errors.photo.message as string}</FieldError>
          )}
        </Field>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field data-invalid={!!errors.rating} className="space-y-3">
            <FieldLabel className="font-bold text-base">
              Penilaian Kualitas
            </FieldLabel>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <StarRating
                  interactive={true}
                  size={36}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.rating && <FieldError>{errors.rating.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.sppgId} className="space-y-3">
            <FieldLabel htmlFor="sppgId" className="font-bold text-base">
              SPPG Tujuan
            </FieldLabel>
            <Controller
              name="sppgId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoadingTargets || targets.length === 0}
                >
                  <SelectTrigger
                    id="sppgId"
                    className="h-11"
                    aria-invalid={!!errors.sppgId}
                  >
                    <SelectValue
                      placeholder={
                        isLoadingTargets
                          ? "Memuat daftar SPPG..."
                          : "Pilih SPPG tujuan"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {targets.map((target) => (
                      <SelectItem key={target.id} value={target.id}>
                        {target.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {selectedTarget ? (
              <FieldDescription className="flex items-start gap-2">
                <HugeiconsIcon
                  icon={Location01Icon}
                  className="mt-0.5 shrink-0"
                  size={16}
                />
                <span>{selectedTarget.address}</span>
              </FieldDescription>
            ) : (
              <FieldDescription>
                Pilih SPPG yang ingin Anda laporkan agar backend menerima
                `id_sppg` yang valid.
              </FieldDescription>
            )}
            {errors.sppgId && <FieldError>{errors.sppgId.message}</FieldError>}
          </Field>
        </div>

        <Field data-invalid={!!errors.details} className="space-y-3">
          <FieldLabel htmlFor="details" className="font-bold text-base">
            Ulasan Detail
          </FieldLabel>
          <Textarea
            id="details"
            placeholder="Ceritakan lebih lanjut tentang kondisi makanan yang Anda terima..."
            className="min-h-[140px] resize-y"
            {...register("details")}
            aria-invalid={!!errors.details}
          />
          {errors.details && <FieldError>{errors.details.message}</FieldError>}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        className="h-12 w-full bg-primary font-semibold text-base hover:bg-primary/90"
        disabled={isLoadingTargets || isSubmitting || targets.length === 0}
      >
        {isSubmitting ? "Mengirim Laporan..." : "Kirim Laporan Sekarang"}
        <HugeiconsIcon icon={Navigation03Icon} className="ml-2 rotate-90" />
      </Button>
    </form>
  );
}
