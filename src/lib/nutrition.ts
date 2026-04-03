import type { TNutritionalFacts } from "@/types";

type NutritionShare = {
  calories: number;
  grams: number;
  percentage: number;
};

type NutrientAkgBreakdown = {
  carb: number;
  energy: number;
  fat: number;
  protein: number;
};

export type ComputedNutritionBreakdown = {
  displayCalories: number;
  inferredCalories: number;
  shares: {
    protein: NutritionShare;
    carb: NutritionShare;
    fat: NutritionShare;
  };
  akg: NutrientAkgBreakdown;
};

function truncateValue(value: number) {
  return Number(value.toFixed(1));
}

const AKG_REFERENCE = {
  energyKcal: 2150,
  proteinGrams: 60,
  carbGrams: 325,
  fatGrams: 67,
} as const;

const AKG_SHARE_FALLBACK = {
  protein: 0.12,
  carb: 0.6,
  fat: 0.28,
} as const;

export function computeNutritionBreakdown(
  nutritionalFacts: TNutritionalFacts,
): ComputedNutritionBreakdown {
  const proteinCalories = nutritionalFacts.proteinGrams.inGrams * 4;
  const carbCalories = nutritionalFacts.carbGrams.inGrams * 4;
  const fatCalories = nutritionalFacts.fatGrams.inGrams * 9;
  const inferredCalories = truncateValue(
    proteinCalories + carbCalories + fatCalories,
  );
  const displayCalories =
    inferredCalories > 0
      ? inferredCalories
      : truncateValue(nutritionalFacts.calories.inKcal);
  const hasMacroBreakdown = inferredCalories > 0;
  const totalCalories = displayCalories > 0 ? displayCalories : 0;

  const toShare = (value: number, grams: number): NutritionShare => ({
    calories: truncateValue(value),
    grams: truncateValue(grams),
    percentage:
      totalCalories > 0 ? truncateValue((value / totalCalories) * 100) : 0,
  });

  const proteinShareValue = hasMacroBreakdown
    ? proteinCalories
    : totalCalories * AKG_SHARE_FALLBACK.protein;
  const carbShareValue = hasMacroBreakdown
    ? carbCalories
    : totalCalories * AKG_SHARE_FALLBACK.carb;
  const fatShareValue = hasMacroBreakdown
    ? fatCalories
    : totalCalories * AKG_SHARE_FALLBACK.fat;

  return {
    displayCalories,
    inferredCalories,
    shares: {
      protein: toShare(
        proteinShareValue,
        nutritionalFacts.proteinGrams.inGrams,
      ),
      carb: toShare(carbShareValue, nutritionalFacts.carbGrams.inGrams),
      fat: toShare(fatShareValue, nutritionalFacts.fatGrams.inGrams),
    },
    akg: {
      energy:
        AKG_REFERENCE.energyKcal > 0
          ? truncateValue((displayCalories / AKG_REFERENCE.energyKcal) * 100)
          : 0,
      protein:
        AKG_REFERENCE.proteinGrams > 0
          ? truncateValue(
              (nutritionalFacts.proteinGrams.inGrams /
                AKG_REFERENCE.proteinGrams) *
                100,
            )
          : 0,
      carb:
        AKG_REFERENCE.carbGrams > 0
          ? truncateValue(
              (nutritionalFacts.carbGrams.inGrams / AKG_REFERENCE.carbGrams) *
                100,
            )
          : 0,
      fat:
        AKG_REFERENCE.fatGrams > 0
          ? truncateValue(
              (nutritionalFacts.fatGrams.inGrams / AKG_REFERENCE.fatGrams) *
                100,
            )
          : 0,
    },
  };
}
