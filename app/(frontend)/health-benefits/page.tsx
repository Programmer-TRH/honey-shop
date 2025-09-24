import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { HealthBenefitsHero } from "@/components/layout/helth-benifits/health-benefits-hero";
import { BenefitsGrid } from "@/components/layout/helth-benifits/benefits-grid";
import { ScientificEvidence } from "@/components/layout/helth-benifits/scientific-evidence";
import { HowToUse } from "@/components/layout/helth-benifits/how-to-use";
import { HealthTestimonials } from "@/components/layout/helth-benifits/health-testimonials";
import { OfferBanner } from "@/components/shared/offer-banner";

export default function HealthBenefitsPage() {
  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main>
        <HealthBenefitsHero />
        <BenefitsGrid />
        <ScientificEvidence />
        <HowToUse />
        <HealthTestimonials />
      </main>
      <Footer />
    </div>
  );
}
