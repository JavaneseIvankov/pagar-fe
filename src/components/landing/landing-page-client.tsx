"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logoutAction } from "@/lib/auth";
import type { TAuthSession } from "@/types";

import { CtaSection } from "./cta-section";
import { FaqAccordions } from "./faq-accordions";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { HowWeWorkSection } from "./how-we-work-section";
import { InfoBannerSection } from "./info-banner-section";
import { Navbar } from "./navbar";
import { StatsSection } from "./stats-section";
import { TargetAudienceSection } from "./target-audience-section";

export function LandingPageClient({
  session,
}: {
  session: TAuthSession | null;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      router.refresh();
    });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-neutral-50 font-sans text-neutral-900 selection:bg-green-200 selection:text-green-900">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: improve seo with json-ld
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Pagar",
            url: "https://pagar-fe.vercel.app",
            logo: "https://pagar-fe.vercel.app/logo.png",
            description:
              "Platform terintegrasi untuk memantau kualitas nutrisi makanan dan transparansi anggaran di sekolah Indonesia",
            sameAs: [],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Support",
              url: "https://pagar-fe.vercel.app",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: deliberate for json-ld seo
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://pagar-fe.vercel.app",
            name: "Pagar",
            description: "Transparansi Nutrisi & Anggaran Makanan Sekolah",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://pagar-fe.vercel.app/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <Navbar session={session} onLogout={handleLogout} />
      <HeroSection />
      <InfoBannerSection />
      <TargetAudienceSection />
      <StatsSection />
      <HowWeWorkSection />
      <CtaSection />
      <FaqAccordions className="mx-auto mb-20 md:mb-24 lg:mb-30" />
      <Footer />
    </div>
  );
}
