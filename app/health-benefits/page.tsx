import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HealthBenefitsHero } from "@/components/health-benefits-hero"
import { BenefitsGrid } from "@/components/benefits-grid"
import { ScientificEvidence } from "@/components/scientific-evidence"
import { HowToUse } from "@/components/how-to-use"
import { HealthTestimonials } from "@/components/health-testimonials"
import { OfferBanner } from "@/components/offer-banner"

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
  )
}
