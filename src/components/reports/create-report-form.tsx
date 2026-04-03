"use client";

import { Location01Icon, Navigation03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import StarRating from "@/components/reports/star-rating";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TReviewSppgTarget } from "@/types";
import { SendIcon } from "../exported-icons";

export interface PublicCreateReportFormValues {
  photo?: File;
  rating: number;
  title: string;
  details: string;
  sppgId: string;
}

interface PublicCreateReportFormProps {
  control: Control<PublicCreateReportFormValues>;
  errors: FieldErrors<PublicCreateReportFormValues>;
  handleSubmit: UseFormHandleSubmit<PublicCreateReportFormValues>;
  isSubmitting?: boolean;
  onRetryTargets?: () => void;
  onPhotoReject: (message: string) => void;
  onPhotoSelect: (file?: File) => void;
  onSubmit: SubmitHandler<PublicCreateReportFormValues>;
  register: UseFormRegister<PublicCreateReportFormValues>;
  selectedTarget?: TReviewSppgTarget;
  targetsError?: string | null;
  targetsLoading?: boolean;
  targets: TReviewSppgTarget[];
}

export function CreateReportForm({
  control,
  errors,
  handleSubmit,
  isSubmitting = false,
  onRetryTargets,
  onPhotoReject,
  onPhotoSelect,
  onSubmit,
  register,
  selectedTarget,
  targetsError,
  targetsLoading = false,
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
                maxSizeMB={3}
                value={field.value ? [field.value] : []}
                onChange={(files) => {
                  field.onChange(files[0]);
                  onPhotoSelect(files[0]);
                }}
                onReject={(rejections) => onPhotoReject(rejections[0].message)}
                helperText="Unggah bukti pendukung berupa JPG, PNG, atau WEBP (maks. 3MB)"
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
                <Combobox
                  items={targets}
                  itemToStringLabel={(target: TReviewSppgTarget) => target.name}
                  itemToStringValue={(target: TReviewSppgTarget) => target.name}
                  value={selectedTarget ?? null}
                  onValueChange={(value) => {
                    field.onChange(value?.id ?? "");
                  }}
                >
                  <ComboboxInput
                    id="sppgId"
                    className="w-full"
                    disabled={targetsLoading || !!targetsError}
                    aria-invalid={!!errors.sppgId}
                    placeholder={
                      targetsLoading
                        ? "Memuat daftar SPPG..."
                        : targetsError
                          ? "Daftar SPPG gagal dimuat"
                          : "Cari atau pilih SPPG tujuan"
                    }
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>
                      {targetsLoading
                        ? "Memuat daftar SPPG..."
                        : "Tidak ada SPPG yang cocok"}
                    </ComboboxEmpty>
                    <ComboboxList>
                      {(target: TReviewSppgTarget) => (
                        <ComboboxItem key={target.id} value={target}>
                          <div className="flex flex-col">
                            <span>{target.name}</span>
                            <span className="text-muted-foreground text-xs">
                              {target.address}
                            </span>
                          </div>
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}
            />
            {targetsError ? (
              <FieldDescription className="flex items-center justify-between gap-3">
                <span>Gagal memuat daftar SPPG tujuan.</span>
                {onRetryTargets ? (
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-auto px-0 font-semibold text-primary"
                    onClick={onRetryTargets}
                  >
                    Coba lagi
                  </Button>
                ) : null}
              </FieldDescription>
            ) : selectedTarget ? (
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

        <Field data-invalid={!!errors.title} className="space-y-3">
          <FieldLabel htmlFor="title" className="font-bold text-base">
            Judul Laporan
          </FieldLabel>
          <Input
            id="title"
            placeholder="Contoh: Porsi tidak sesuai"
            {...register("title")}
            aria-invalid={!!errors.title}
          />
          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </Field>

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
        disabled={
          targetsLoading ||
          isSubmitting ||
          targets.length === 0 ||
          !!targetsError
        }
      >
        {isSubmitting ? "Mengirim Laporan..." : "Kirim Laporan Sekarang"}
        <SendIcon className="ml-2" />
      </Button>
    </form>
  );
}
