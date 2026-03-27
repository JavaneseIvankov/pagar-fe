"use client";

import { CreateReportForm } from "@/components/dashboard/sppg/create-report-form";
import { usePersistedSppgCreateReportForm } from "@/hooks/use-persisted-sppg-create-report-form";

export function SppgCreateReportContainer() {
  const {
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
  } = usePersistedSppgCreateReportForm();

  return (
    <CreateReportForm
      append={append}
      control={control}
      errors={errors}
      fields={fields}
      handleSubmit={handleSubmit}
      isHydrating={isHydrating}
      onSubmit={onSubmit}
      register={register}
      remove={remove}
      totalAnggaranPerPorsi={totalAnggaranPerPorsi}
    />
  );
}
