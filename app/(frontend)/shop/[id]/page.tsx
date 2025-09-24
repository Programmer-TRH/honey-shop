import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ProductDetails } from "@/components/layout/shop/product-details";
import { RelatedProducts } from "@/components/layout/shop/related-products";
import { FloatingCart } from "@/components/shared/floating-cart";
import { OfferBanner } from "@/components/shared/offer-banner";
import { getProduct } from "@/actions/data-actions";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;
  const product = await getProduct(productId);

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
  );
}
