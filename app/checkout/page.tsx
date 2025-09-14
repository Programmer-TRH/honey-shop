import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutContent } from "@/components/checkout-content"
import { OfferBanner } from "@/components/offer-banner"

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
  )
}
