import { ProductDetails } from "@/components/layout/shop/product-details";
import { RelatedProducts } from "@/components/layout/shop/related-products";
import {
  getProduct,
  getProducts,
  getRelatedProducts,
} from "@/services/product-services";

export const revalidate = 60;

// Generate static params for all blog posts
export async function generateStaticParams() {
  const products = await getProducts();
  const productID = products.data.map((product) => ({
    productId: product.id.toString(),
  }));
  console.log("Product ID:", productID);
  return productID;
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string } | Promise<{ productId: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { productId } = resolvedParams;

  const currentProduct = await getProduct(productId);
  const data = await getRelatedProducts({ currentProduct });

  return (
    <>
      <div className="container mx-auto p-4 md:py-8">
        <ProductDetails product={currentProduct} />
        <RelatedProducts relatedProducts={data} />
      </div>
    </>
  );
}
