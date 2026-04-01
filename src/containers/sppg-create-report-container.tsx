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
    isSubmitting,
    jumlahPorsi,
    onBudgetProofReject,
    onBudgetProofSelect,
    onFoodPhotoReject,
    onFoodPhotoSelect,
    onSubmit,
    register,
    remove,
    targetKalori,
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
      isSubmitting={isSubmitting}
      jumlahPorsi={jumlahPorsi}
      onBudgetProofReject={onBudgetProofReject}
      onBudgetProofSelect={onBudgetProofSelect}
      onFoodPhotoReject={onFoodPhotoReject}
      onFoodPhotoSelect={onFoodPhotoSelect}
      onSubmit={onSubmit}
      register={register}
      remove={remove}
      targetKalori={targetKalori}
      totalAnggaranPerPorsi={totalAnggaranPerPorsi}
    />
  );
}
