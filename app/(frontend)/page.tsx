import { Hero } from "@/components/layout/home/hero";
import { WhyOurHoney } from "@/components/layout/home/why-our-honey";
import { FeaturedProduct } from "@/components/layout/home/featured-product";
import { Testimonials } from "@/components/layout/home/testimonials";
import { CallToActionBanner } from "@/components/layout/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyOurHoney />
      <FeaturedProduct />
      <Testimonials />
      <CallToActionBanner />
    </>
  );
}
