import { MoneyIcon } from "@/components/exported-icons";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrencyIdr } from "@/lib/formatters";
import type { TBudget } from "@/types";
import {
  SppgDetailSectionCard,
  SppgDetailSectionHeader,
} from "./sppg-report-detail-layout";

export interface SppgReportBudgetCardProps {
  budget: TBudget;
}

export function SppgReportBudgetCard({ budget }: SppgReportBudgetCardProps) {
  const isEmpty = !budget?.items || budget.items.length === 0;

  return (
    <SppgDetailSectionCard>
      <SppgDetailSectionHeader
        title="Transparansi Anggaran"
        icon={<MoneyIcon className="h-6 w-6 text-green-500" />}
        className="pt-6 pb-4"
      />
      <CardContent className="flex w-full flex-col gap-6 pb-6 font-medium text-sm">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <MoneyIcon className="mb-3 h-10 w-10 opacity-20" />
            <p>Belum ada data rincian anggaran yang ditambahkan.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {budget.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 text-xs md:text-sm"
                >
                  <span className="text-foreground/80 leading-relaxed">
                    {item.name}
                  </span>
                  <span className="whitespace-nowrap font-bold">
                    {formatCurrencyIdr(item.price)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="border-foreground/10" />

            <div className="flex items-center justify-between pb-0 font-extrabold text-sm md:text-base">
              <span>Total Harga Per Porsi</span>
              <span className="text-base text-green-500 md:text-lg">
                {formatCurrencyIdr(budget.totalPrice)}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </SppgDetailSectionCard>
  );
}
