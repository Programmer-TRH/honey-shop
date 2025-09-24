import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { AboutHero } from "@/components/layout/about/about-hero";
import { OurStory } from "@/components/layout/about/our-story";
import { OurValues } from "@/components/layout/about/our-values";
import { Certifications } from "@/components/layout/about/certifications";
import { OfferBanner } from "@/components/shared/offer-banner";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main>
        <AboutHero />
        <OurStory />
        <OurValues />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
