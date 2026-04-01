import { GraphBoxIcon } from "@/components/exported-icons";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/multi-segment-progress";
import { computeNutritionBreakdown } from "@/lib/nutrition";
import { cn } from "@/lib/utils";
import type { TNutritionalFacts } from "@/types";
import {
  SppgDetailSectionCard,
  SppgDetailSectionHeader,
} from "./sppg-report-detail-layout";

const PROTEIN_FILL_CLASS = "bg-[#38bdf8]";
const CARB_FILL_CLASS = "bg-[#fb923c]";
const FAT_FILL_CLASS = "bg-[#a855f7]";

interface NutritionFactTileProps {
  label: string;
  value: number;
  unit: string;
  supportingText: string;
  className?: string;
}

export interface SppgReportNutritionCardProps {
  nutritionalFacts: TNutritionalFacts;
}

function NutritionFactTile({
  label,
  value,
  unit,
  supportingText,
  className,
}: NutritionFactTileProps) {
  return (
    <div
      className={cn(
        "flex aspect-[5/4] flex-col items-center justify-center rounded-lg border p-3 text-center md:aspect-auto",
        className,
      )}
    >
      <p className="mb-1 font-bold text-[10px] text-foreground/50 uppercase tracking-widest md:text-[11px]">
        {label}
      </p>
      <div className="my-0.5 flex flex-col items-center">
        <p
          className="font-extrabold text-xl leading-none md:text-2xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {value}
        </p>
        <p className="mt-1 font-semibold text-[10px] text-foreground/80">
          {unit}
        </p>
      </div>
      <p className="mt-1 font-semibold text-[10px] text-foreground/50">
        {supportingText}
      </p>
    </div>
  );
}

export function SppgReportNutritionCard({
  nutritionalFacts,
}: SppgReportNutritionCardProps) {
  const nutritionBreakdown = computeNutritionBreakdown(nutritionalFacts);
  let runningPercent = 0;

  const segments = [
    {
      contributionPercent: nutritionBreakdown.shares.protein.percentage,
      color: PROTEIN_FILL_CLASS,
    },
    {
      contributionPercent: nutritionBreakdown.shares.carb.percentage,
      color: CARB_FILL_CLASS,
    },
    {
      contributionPercent: nutritionBreakdown.shares.fat.percentage,
      color: FAT_FILL_CLASS,
    },
  ].map((segment) => {
    runningPercent += segment.contributionPercent;

    return {
      value: runningPercent,
      color: segment.color,
    };
  });

  return (
    <SppgDetailSectionCard>
      <SppgDetailSectionHeader
        title="Kandungan Gizi Per Porsi"
        icon={<GraphBoxIcon className="h-6 w-6 text-green-500" />}
        className="pt-5 pb-4"
      />
      <CardContent className="flex w-full flex-col gap-6">
        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
          <NutritionFactTile
            label="Kalori"
            value={nutritionBreakdown.displayCalories}
            unit="kkal"
            supportingText="Hasil hitung per porsi"
            className="border-[#4ade80] bg-[#4ade80]/10"
          />
          <NutritionFactTile
            label="Protein"
            value={nutritionalFacts.proteinGrams.inGrams}
            unit="gram"
            supportingText={`${nutritionBreakdown.shares.protein.percentage}% kalori`}
            className="border-[#38bdf8] bg-[#38bdf8]/10"
          />
          <NutritionFactTile
            label="Karbo"
            value={nutritionalFacts.carbGrams.inGrams}
            unit="gram"
            supportingText={`${nutritionBreakdown.shares.carb.percentage}% kalori`}
            className="border-[#fb923c] bg-[#fb923c]/10"
          />
          <NutritionFactTile
            label="Lemak"
            value={nutritionalFacts.fatGrams.inGrams}
            unit="gram"
            supportingText={`${nutritionBreakdown.shares.fat.percentage}% kalori`}
            className="border-[#a855f7] bg-[#a855f7]/10"
          />
        </div>

        <div className="space-y-4 pt-2">
          <div className="relative h-3 w-full overflow-hidden rounded-full">
            <Progress segments={segments} className="h-full rounded-full" />
          </div>

          <div className="flex flex-wrap items-center justify-start gap-4 font-semibold text-foreground/70 text-xs">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  PROTEIN_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">
                Protein {nutritionBreakdown.shares.protein.percentage}%
              </span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  CARB_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">
                Karbo {nutritionBreakdown.shares.carb.percentage}%
              </span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  FAT_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">
                Lemak {nutritionBreakdown.shares.fat.percentage}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </SppgDetailSectionCard>
  );
}
