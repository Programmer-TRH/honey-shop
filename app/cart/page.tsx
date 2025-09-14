import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartContent } from "@/components/cart-content"
import { OfferBanner } from "@/components/offer-banner"
import { FloatingCart } from "@/components/floating-cart"

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
  )
}
