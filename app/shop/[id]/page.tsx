import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { FloatingCart } from "@/components/floating-cart"
import { OfferBanner } from "@/components/offer-banner"
import { getProduct } from "@/lib/actions/data-actions"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id
  const product = await getProduct(productId)

  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <ProductDetails product={product} />
          <RelatedProducts />
        </div>
      </main>
      <Footer />
      <FloatingCart />
    </div>
  )
}
