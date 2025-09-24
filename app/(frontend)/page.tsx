import { Hero } from "@/components/layout/home/hero";
import { WhyOurHoney } from "@/components/layout/home/why-our-honey";
import { FeaturedProduct } from "@/components/layout/home/featured-product";
import { Testimonials } from "@/components/layout/home/testimonials";
import { CallToActionBanner } from "@/components/layout/home/cta-banner";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { OfferBanner } from "@/components/shared/offer-banner";
import { FloatingCart } from "@/components/shared/floating-cart";

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
  );
}
