import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OfferBanner } from "@/components/offer-banner"
import { OrderConfirmation } from "@/components/order-confirmation"
import { getOrder } from "@/lib/actions/checkout-actions"
import { notFound } from "next/navigation"

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <OrderConfirmation order={order} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
