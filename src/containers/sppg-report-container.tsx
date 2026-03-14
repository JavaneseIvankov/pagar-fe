import { SppgReportCard } from "@/components/sppg-report-card";

export function SppgReportContainer() {
  const author = "Anonim";
  const timeSincePosted = "2 jam lalu";
  const origin = "SDN Kauman 1 Malang";
  const title = "Menu Ikan Goreng";
  const content =
    "Sayurnya agak layu tapi ikan segar. Porsi nasi bisa ditambah.";
  const likes = 124;
  const comments = 18;
  const image = "https://placehold.co/600x400";

  const rawNutritionalFacts = {
    caloriesKcal: 710,
    proteinGrams: 35,
    carbGrams: 65,
    fatGrams: 65,
  };

  const nutritionalFacts = [
    { label: "KALORI", value: `${rawNutritionalFacts.caloriesKcal} kcal` },
    { label: "PROTEIN", value: `${rawNutritionalFacts.proteinGrams} gram` },
    { label: "KARBO", value: `${rawNutritionalFacts.carbGrams} gram` },
    { label: "LEMAK", value: `${rawNutritionalFacts.fatGrams} gram` },
  ];

  return (
    <SppgReportCard
      author={author}
      timeSincePosted={timeSincePosted}
      origin={origin}
      title={title}
      content={content}
      likes={likes}
      comments={comments}
      image={image}
      nutritionalFacts={nutritionalFacts}
    />
  );
}
