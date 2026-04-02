import { LandingPageClient } from "@/components/landing/landing-page-client";
import { getAuthSession } from "@/lib/auth/server";

export default async function LandingPage() {
  const session = await getAuthSession();
  return <LandingPageClient session={session} />;
}