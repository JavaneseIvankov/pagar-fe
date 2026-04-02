import { cn } from "@/lib/utils";
import type { TNutritionalFacts } from "@/types";

export interface NutritionalFactsProps {
  facts: TNutritionalFacts;
}

export interface NutritionalFactItemProps {
  label: string;
  value: number;
  unit: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function NutritionalFactItem({
  label,
  value,
  unit,
  className,
  labelClassName,
  valueClassName,
}: NutritionalFactItemProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-0 bg-muted px-1 py-1.5 text-center",
        className,
      )}
    >
      <p
        className={cn(
          "text-[9px] text-foreground/40 uppercase tracking-tight sm:text-[10px]",
          labelClassName,
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-0.5 font-bold text-[10px] leading-tight sm:text-[11px] lg:text-xs",
          valueClassName,
        )}
      >
        {value} {unit}
      </p>
    </div>
  );
}

export function NutritionalFacts({ facts }: NutritionalFactsProps) {
  return (
    <div className="@container my-2 w-full">
      <div className="grid grid-cols-4 gap-1 rounded-lg sm:gap-1.5">
        <NutritionalFactItem
          label="Kalori"
          value={facts.calories.inKcal}
          unit="kkal"
        />
        <NutritionalFactItem
          label="Protein"
          value={facts.proteinGrams.inGrams}
          unit="gram"
        />
        <NutritionalFactItem
          label="Karbo"
          value={facts.carbGrams.inGrams}
          unit="gram"
        />
        <NutritionalFactItem
          label="Lemak"
          value={facts.fatGrams.inGrams}
          unit="gram"
        />
      </div>
    </div>
  );
}
