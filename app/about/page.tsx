import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { OurStory } from "@/components/our-story"
import { OurValues } from "@/components/our-values"
import { Certifications } from "@/components/certifications"
import { OfferBanner } from "@/components/offer-banner"

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
  )
}
