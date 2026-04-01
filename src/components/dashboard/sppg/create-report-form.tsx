"use client";

import {
  Delete02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Controller } from "react-hook-form";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import {
  ForkAndSpoonIcon,
  HeartWithHaloIcon,
  MoneyIcon,
  SendIcon,
} from "@/components/exported-icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { TCreateReportForm } from "@/hooks/use-persisted-sppg-create-report-form";

interface DashboardCreateReportFormProps {
  append: (value: { komponenBiaya: string; biayaSatuan: number }) => void;
  control: Control<TCreateReportForm>;
  errors: FieldErrors<TCreateReportForm>;
  fields: Array<{ id: string }>;
  handleSubmit: UseFormHandleSubmit<TCreateReportForm>;
  isHydrating: boolean;
  isSubmitting: boolean;
  jumlahPorsi: number;
  onBudgetProofReject: (message: string) => void;
  onBudgetProofSelect: () => void;
  onFoodPhotoReject: (message: string) => void;
  onFoodPhotoSelect: () => void;
  onSubmit: SubmitHandler<TCreateReportForm>;
  register: UseFormRegister<TCreateReportForm>;
  remove: (index: number) => void;
  targetKalori: number;
  totalAnggaranPerPorsi: number;
}

export function CreateReportForm({
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
}: DashboardCreateReportFormProps) {
  if (isHydrating) {
    return <div className="overflow-y-scroll"></div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_350px]"
    >
      {/* KIRI - Form Section */}
      <div className="flex flex-col gap-6">
        {/* SECTION 1: Informasi Menu Utama */}
        <DashboardCard className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <ForkAndSpoonIcon className="size-5 text-emerald-500" />
            <h2 className="font-bold text-xl">Informasi Menu Utama</h2>
          </div>

          <FieldGroup className="gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field data-invalid={!!errors.tanggalLaporan}>
                <FieldLabel htmlFor="tanggalLaporan">
                  Tanggal Laporan
                </FieldLabel>
                <Input
                  id="tanggalLaporan"
                  type="date"
                  {...register("tanggalLaporan")}
                  aria-invalid={!!errors.tanggalLaporan}
                />
                {errors.tanggalLaporan && (
                  <FieldError>{errors.tanggalLaporan.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.namaMenu}>
                <FieldLabel htmlFor="namaMenu">Nama Menu Makanan</FieldLabel>
                <Input
                  id="namaMenu"
                  placeholder="Contoh : Nasi Ayam Bakar"
                  {...register("namaMenu")}
                  aria-invalid={!!errors.namaMenu}
                />
                {errors.namaMenu && (
                  <FieldError>{errors.namaMenu.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.waktuMakan}>
                <FieldLabel htmlFor="waktuMakan">Waktu Makan</FieldLabel>
                <div className="relative">
                  <Input
                    id="waktuMakan"
                    placeholder="Makan Siang (12:00 - 13:00)"
                    {...register("waktuMakan")}
                    aria-invalid={!!errors.waktuMakan}
                  />
                </div>
                {errors.waktuMakan && (
                  <FieldError>{errors.waktuMakan.message}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.jumlahPorsi}>
                <FieldLabel htmlFor="jumlahPorsi">Jumlah Porsi</FieldLabel>
                <Input
                  id="jumlahPorsi"
                  type="number"
                  min={1}
                  placeholder="Masukkan total porsi"
                  {...register("jumlahPorsi", { valueAsNumber: true })}
                  aria-invalid={!!errors.jumlahPorsi}
                />
                {errors.jumlahPorsi && (
                  <FieldError>{errors.jumlahPorsi.message}</FieldError>
                )}
              </Field>
            </div>

            <Field data-invalid={!!errors.deskripsi}>
              <FieldLabel htmlFor="deskripsi">
                Deskripsi/Catatan Khusus
              </FieldLabel>
              <Textarea
                id="deskripsi"
                placeholder="Informasi tambahan mengenai bahan atau alergi..."
                className="min-h-[100px]"
                {...register("deskripsi")}
                aria-invalid={!!errors.deskripsi}
              />
              <FieldDescription>
                Catatan khusus ini masih disimpan di draft lokal. Backend saat
                ini belum menyediakan field catatan tambahan untuk laporan
                harian.
              </FieldDescription>
              {errors.deskripsi && (
                <FieldError>{errors.deskripsi.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </DashboardCard>

        {/* SECTION 2: Unggah Foto Makanan */}
        <div className="w-full">
          <Controller
            name="fotoMakanan"
            control={control}
            render={({ field }) => (
              <FileUpload
                maxFiles={1}
                maxSizeMB={3}
                value={field.value ?? []}
                onChange={(files) => {
                  field.onChange(files);
                  onFoodPhotoSelect();
                }}
                onReject={(rejections) =>
                  onFoodPhotoReject(rejections[0].message)
                }
                dropzoneClassName={
                  errors.fotoMakanan
                    ? "border-destructive bg-destructive/5 hover:bg-destructive/10"
                    : undefined
                }
                title="Unggah Foto Makanan"
                helperText="Pastikan foto jelas dan memperlihatkan seluruh porsi makanan (maks. 3MB)"
              />
            )}
          />
          {errors.fotoMakanan && (
            <p className="mt-2 text-destructive text-sm">
              {errors.fotoMakanan.message as string}
            </p>
          )}
        </div>

        {/* SECTION 3: Kandungan Gizi */}
        <DashboardCard className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <HeartWithHaloIcon className="size-5 text-emerald-500" />
            <h2 className="font-bold text-xl">Kandungan Gizi (Per Porsi)</h2>
          </div>

          <FieldGroup className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Field data-invalid={!!errors.gizi?.energi}>
              <FieldLabel htmlFor="gizi.energi">Energi (KCAL)</FieldLabel>
              <Input
                id="gizi.energi"
                type="number"
                placeholder="0 kcal"
                {...register("gizi.energi", { valueAsNumber: true })}
                aria-invalid={!!errors.gizi?.energi}
              />
              {errors.gizi?.energi && (
                <FieldError>{errors.gizi.energi.message}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.gizi?.protein}>
              <FieldLabel htmlFor="gizi.protein">Protein (G)</FieldLabel>
              <Input
                id="gizi.protein"
                type="number"
                placeholder="0 g"
                {...register("gizi.protein", { valueAsNumber: true })}
                aria-invalid={!!errors.gizi?.protein}
              />
              {errors.gizi?.protein && (
                <FieldError>{errors.gizi.protein.message}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.gizi?.lemak}>
              <FieldLabel htmlFor="gizi.lemak">Lemak (G)</FieldLabel>
              <Input
                id="gizi.lemak"
                type="number"
                placeholder="0 g"
                {...register("gizi.lemak", { valueAsNumber: true })}
                aria-invalid={!!errors.gizi?.lemak}
              />
              {errors.gizi?.lemak && (
                <FieldError>{errors.gizi.lemak.message}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.gizi?.karbohidrat}>
              <FieldLabel htmlFor="gizi.karbohidrat">
                Karbohidrat (G)
              </FieldLabel>
              <Input
                id="gizi.karbohidrat"
                type="number"
                placeholder="0 g"
                {...register("gizi.karbohidrat", { valueAsNumber: true })}
                aria-invalid={!!errors.gizi?.karbohidrat}
              />
              {errors.gizi?.karbohidrat && (
                <FieldError>{errors.gizi.karbohidrat.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </DashboardCard>

        {/* SECTION 4: Rincian Anggaran */}
        <DashboardCard className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MoneyIcon className="size-5 text-emerald-500" />
              <h2 className="font-bold text-xl">Rincian Anggaran</h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="font-semibold text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => append({ komponenBiaya: "", biayaSatuan: 0 })}
            >
              Tambah Item
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="font-medium text-muted-foreground">
                    Komponen Biaya
                  </TableHead>
                  <TableHead className="text-right font-medium text-muted-foreground">
                    Biaya Satuan (Rp)
                  </TableHead>
                  <TableHead className="w-16 text-right font-medium text-muted-foreground">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow
                    key={field.id}
                    className="border-none hover:bg-transparent"
                  >
                    <TableCell className="py-3 pl-0 align-top">
                      <Field
                        data-invalid={
                          !!errors.rincianAnggaran?.[index]?.komponenBiaya
                        }
                      >
                        <Input
                          placeholder="Nama Komponen"
                          className="border-none px-0 font-medium shadow-none focus-visible:ring-0"
                          {...register(
                            `rincianAnggaran.${index}.komponenBiaya` as const,
                          )}
                        />
                        {errors.rincianAnggaran?.[index]?.komponenBiaya && (
                          <FieldError>
                            {
                              errors.rincianAnggaran[index]?.komponenBiaya
                                ?.message
                            }
                          </FieldError>
                        )}
                      </Field>
                    </TableCell>
                    <TableCell className="py-3 align-top">
                      <Field
                        data-invalid={
                          !!errors.rincianAnggaran?.[index]?.biayaSatuan
                        }
                      >
                        <div className="relative flex items-center justify-end">
                          <span className="absolute left-3 font-medium text-sm">
                            Rp
                          </span>
                          <Input
                            type="number"
                            className="border-none pl-8 text-right font-medium shadow-none focus-visible:ring-0"
                            {...register(
                              `rincianAnggaran.${index}.biayaSatuan` as const,
                              { valueAsNumber: true },
                            )}
                          />
                        </div>
                        {errors.rincianAnggaran?.[index]?.biayaSatuan && (
                          <FieldError className="text-right">
                            {
                              errors.rincianAnggaran[index]?.biayaSatuan
                                ?.message
                            }
                          </FieldError>
                        )}
                      </Field>
                    </TableCell>
                    <TableCell className="py-3 pr-0 text-right align-top">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-0.5 h-10 w-10 text-muted-foreground hover:bg-red-50 hover:text-red-500"
                        onClick={() => remove(index)}
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-500 px-6 py-4 text-white">
            <span className="font-semibold">Total Anggaran Per Porsi</span>
            <span className="font-bold">
              Rp {totalAnggaranPerPorsi.toLocaleString("id-ID")}
            </span>
          </div>
        </DashboardCard>

        {/* SECTION 5: Bukti Rincian Anggaran */}
        <div className="w-full">
          <Controller
            name="buktiAnggaran"
            control={control}
            render={({ field }) => (
              <FileUpload
                maxFiles={1}
                maxSizeMB={3}
                accept="image/png,image/jpeg,image/webp"
                value={field.value ?? []}
                onChange={(files) => {
                  field.onChange(files);
                  onBudgetProofSelect();
                }}
                onReject={(rejections) =>
                  onBudgetProofReject(rejections[0].message)
                }
                dropzoneClassName={
                  errors.buktiAnggaran
                    ? "border-destructive bg-destructive/5 hover:bg-destructive/10"
                    : undefined
                }
                title="Unggah Bukti Rincian Anggaran"
                helperText="Backend menerima bukti anggaran berupa JPG, PNG, atau WEBP (maks. 3MB)"
              />
            )}
          />
          {errors.buktiAnggaran && (
            <p className="mt-2 text-destructive text-sm">
              {errors.buktiAnggaran.message as string}
            </p>
          )}
        </div>
      </div>

      {/* KANAN - Summary Section */}
      <div className="sticky top-8">
        <DashboardCard className="p-6">
          <h2 className="mb-6 font-bold text-lg">Ringkasan Laporan</h2>

          <div className="mb-8 flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Porsi</span>
              <span className="font-semibold">
                {jumlahPorsi > 0
                  ? `${jumlahPorsi.toLocaleString("id-ID")} Porsi`
                  : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Target Kalori</span>
              <span className="font-semibold text-emerald-500">
                {targetKalori > 0 ? `${targetKalori} kcal` : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Anggaran</span>
              <span className="font-semibold">
                Rp {totalAnggaranPerPorsi.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="mb-4 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 text-base text-white hover:bg-emerald-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Mengirim Laporan..." : "Kirim Laporan"}
            <SendIcon className="size-4" />
          </Button>

          <div className="flex gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4 text-sky-600 text-sm">
            <div className="mt-0.5 shrink-0">
              <HugeiconsIcon
                icon={InformationCircleIcon}
                size={18}
                className="fill-sky-500 text-sky-50"
              />
            </div>
            <p>
              Laporan yang sudah dikirim akan langsung tersedia untuk publik
              sebagai bentuk transparansi gizi. Pastikan data sudah valid.
            </p>
          </div>
        </DashboardCard>
      </div>
    </form>
  );
}
