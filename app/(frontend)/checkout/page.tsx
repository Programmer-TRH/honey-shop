import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { CheckoutContent } from "@/components/layout/checkout/checkout-content";
import { OfferBanner } from "@/components/shared/offer-banner";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <CheckoutContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
