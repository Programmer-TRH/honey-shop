import { ProductDetails } from "@/components/layout/shop/product-details";
import { RelatedProducts } from "@/components/layout/shop/related-products";
import { getProduct } from "@/actions/data-actions";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;
  const product = await getProduct(productId);

  return (
    <>
      <div className="container mx-auto p-4 md:py-8">
        <ProductDetails product={product} />
        <RelatedProducts />
      </div>
    </>
  );
}
