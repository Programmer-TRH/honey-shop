import { Hero } from "@/components/hero"
import { WhyOurHoney } from "@/components/why-our-honey"
import { FeaturedProduct } from "@/components/featured-product"
import { Testimonials } from "@/components/testimonials"
import { CallToActionBanner } from "@/components/cta-banner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OfferBanner } from "@/components/offer-banner"
import { FloatingCart } from "@/components/floating-cart"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main>
        <Hero />
        <WhyOurHoney />
        <FeaturedProduct />
        <Testimonials />
        <CallToActionBanner />
      </main>
      <Footer />
      <FloatingCart />
    </div>
  )
}
