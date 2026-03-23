import { GraphBoxIcon } from "@/components/exported-icons";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/multi-segment-progress";
import { cn } from "@/lib/utils";
import type { TNutritionalFacts } from "@/types";
import {
  SppgDetailSectionCard,
  SppgDetailSectionHeader,
} from "./sppg-report-detail-layout";

const CALORIES_FILL_CLASS = "bg-[#4ade80]";
const PROTEIN_FILL_CLASS = "bg-[#38bdf8]";
const CARB_FILL_CLASS = "bg-[#fb923c]";
const FAT_FILL_CLASS = "bg-[#a855f7]";

interface NutritionFactTileProps {
  label: string;
  value: number;
  unit: string;
  dciPercent: number;
  className?: string;
}

export interface SppgReportNutritionCardProps {
  nutritionalFacts: TNutritionalFacts;
}

function NutritionFactTile({
  label,
  value,
  unit,
  dciPercent,
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
        {dciPercent}%
      </p>
    </div>
  );
}

export function SppgReportNutritionCard({
  nutritionalFacts,
}: SppgReportNutritionCardProps) {
  const calorieDci = nutritionalFacts.calories.inDciPercent;
  const proteinDci = nutritionalFacts.proteinGrams.inDciPercent;
  const carbDci = nutritionalFacts.carbGrams.inDciPercent;
  const fatDci = nutritionalFacts.fatGrams.inDciPercent;
  const totalDci = calorieDci + proteinDci + carbDci + fatDci || 1;
  let runningPercent = 0;

  const segments = [
    { dciPercent: calorieDci, color: CALORIES_FILL_CLASS },
    { dciPercent: proteinDci, color: PROTEIN_FILL_CLASS },
    { dciPercent: carbDci, color: CARB_FILL_CLASS },
    { dciPercent: fatDci, color: FAT_FILL_CLASS },
  ].map((segment) => {
    const proportion = (segment.dciPercent / totalDci) * 100;
    runningPercent += proportion;

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
            value={nutritionalFacts.calories.inKcal}
            unit="kkal"
            dciPercent={nutritionalFacts.calories.inDciPercent}
            className="border-[#4ade80] bg-[#4ade80]/10"
          />
          <NutritionFactTile
            label="Protein"
            value={nutritionalFacts.proteinGrams.inGrams}
            unit="gram"
            dciPercent={nutritionalFacts.proteinGrams.inDciPercent}
            className="border-[#38bdf8] bg-[#38bdf8]/10"
          />
          <NutritionFactTile
            label="Karbo"
            value={nutritionalFacts.carbGrams.inGrams}
            unit="gram"
            dciPercent={nutritionalFacts.carbGrams.inDciPercent}
            className="border-[#fb923c] bg-[#fb923c]/10"
          />
          <NutritionFactTile
            label="Lemak"
            value={nutritionalFacts.fatGrams.inGrams}
            unit="gram"
            dciPercent={nutritionalFacts.fatGrams.inDciPercent}
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
                  CALORIES_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Kalori</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  PROTEIN_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Protein</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  CARB_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Karbo</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  FAT_FILL_CLASS,
                )}
              />
              <span className="text-[11px] md:text-xs">Lemak</span>
            </div>
          </div>
        </div>
      </CardContent>
    </SppgDetailSectionCard>
  );
}
