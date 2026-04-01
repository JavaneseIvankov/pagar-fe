import type { TNutritionalFacts } from "@/types";

type NutritionShare = {
  grams: number;
  percentage: number;
};

export type ComputedNutritionBreakdown = {
  displayCalories: number;
  shares: {
    protein: NutritionShare;
    carb: NutritionShare;
    fat: NutritionShare;
  };
};

function roundPercentage(value: number) {
  return Number(value.toFixed(1));
}

export function computeNutritionBreakdown(
  nutritionalFacts: TNutritionalFacts,
): ComputedNutritionBreakdown {
  const proteinCalories = nutritionalFacts.proteinGrams.inGrams * 4;
  const carbCalories = nutritionalFacts.carbGrams.inGrams * 4;
  const fatCalories = nutritionalFacts.fatGrams.inGrams * 9;
  const calculatedCalories = proteinCalories + carbCalories + fatCalories;
  const totalCalories = calculatedCalories || nutritionalFacts.calories.inKcal;

  const toShare = (value: number, grams: number) => ({
    grams,
    percentage:
      totalCalories > 0 ? roundPercentage((value / totalCalories) * 100) : 0,
  });

  return {
    displayCalories:
      nutritionalFacts.calories.inKcal > 0
        ? nutritionalFacts.calories.inKcal
        : calculatedCalories,
    shares: {
      protein: toShare(proteinCalories, nutritionalFacts.proteinGrams.inGrams),
      carb: toShare(carbCalories, nutritionalFacts.carbGrams.inGrams),
      fat: toShare(fatCalories, nutritionalFacts.fatGrams.inGrams),
    },
  };
}
