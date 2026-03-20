import { PublicReportCard } from "@/components/reports/public-report-card";

export function PublicReportContainer() {
  const data = {
    author: "Anonim",
    timeSincePosted: "2 jam lalu",
    origin: "SDN Kauman 1 Malang",
    stars: 4,
    title: "Menu Ikan Goreng",
    content: "Sayurnya agak layu tapi ikan segar. Porsi nasi bisa ditambah.",
    likes: 124,
    comments: 18,
    image: "https://placehold.co/600x400",
    forSppgName: "CV. Berkah Nutrisi",
  };

  // TASK: later, we would need to implement infinite scroll here
  return <PublicReportCard {...data} />;
}
