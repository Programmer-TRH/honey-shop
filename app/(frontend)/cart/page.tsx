import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { CartContent } from "@/components/layout/cart/cart-content";
import { OfferBanner } from "@/components/shared/offer-banner";
import { FloatingCart } from "@/components/shared/floating-cart";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <CartContent />
        </div>
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
}
