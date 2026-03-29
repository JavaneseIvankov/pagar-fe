"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod/v3";
import {
  CreateReportForm,
  type PublicCreateReportFormValues,
} from "@/components/reports/create-report-form";

const formSchema = z.object({
  photo: z.any().optional(),
  rating: z
    .number()
    .min(1, "Berikan penilaian kualitas makanan (minimal 1 bintang)"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  details: z.string().min(10, "Ulasan minimal 10 karakter"),
});

// TASK: make this component accept initial data, it should prefill location (we probably going to refactor location into sppg)

export function PublicCreateReportContainer() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<PublicCreateReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      location: "",
      details: "",
    },
  });

  const onSubmit = (data: PublicCreateReportFormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <CreateReportForm
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
    />
  );
}
