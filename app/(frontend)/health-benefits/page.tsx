import { HealthBenefitsHero } from "@/components/layout/helth-benifits/health-benefits-hero";
import { BenefitsGrid } from "@/components/layout/helth-benifits/benefits-grid";
import { ScientificEvidence } from "@/components/layout/helth-benifits/scientific-evidence";
import { HowToUse } from "@/components/layout/helth-benifits/how-to-use";
import { HealthTestimonials } from "@/components/layout/helth-benifits/health-testimonials";

export default function HealthBenefitsPage() {
  return (
    <>
      <HealthBenefitsHero />
      <BenefitsGrid />
      <ScientificEvidence />
      <HowToUse />
      <HealthTestimonials />
    </>
  );
}
