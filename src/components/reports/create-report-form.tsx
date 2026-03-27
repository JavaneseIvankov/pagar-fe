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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";

export interface PublicCreateReportFormValues {
  photo?: File;
  rating: number;
  location: string;
  details: string;
}

interface PublicCreateReportFormProps {
  control: Control<PublicCreateReportFormValues>;
  errors: FieldErrors<PublicCreateReportFormValues>;
  handleSubmit: UseFormHandleSubmit<PublicCreateReportFormValues>;
  onSubmit: SubmitHandler<PublicCreateReportFormValues>;
  register: UseFormRegister<PublicCreateReportFormValues>;
}

export function CreateReportForm({
  control,
  errors,
  handleSubmit,
  onSubmit,
  register,
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

          <Field data-invalid={!!errors.location} className="space-y-3">
            <FieldLabel htmlFor="location" className="font-bold text-base">
              Lokasi Temuan
            </FieldLabel>
            <InputGroup className="h-11">
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <HugeiconsIcon icon={Location01Icon} />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="location"
                placeholder="Masukkan nama sekolah/instansi"
                {...register("location")}
                aria-invalid={!!errors.location}
              />
            </InputGroup>
            {errors.location && (
              <FieldError>{errors.location.message}</FieldError>
            )}
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
      >
        Kirim Laporan Sekarang
        <HugeiconsIcon icon={Navigation03Icon} className="ml-2 rotate-90" />
      </Button>
    </form>
  );
}
