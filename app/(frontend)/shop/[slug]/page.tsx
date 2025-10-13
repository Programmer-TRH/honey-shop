import { ProductDetails } from "@/components/layout/shop/product-details";
import { RelatedProducts } from "@/components/layout/shop/related-products";
import {
  getProduct,
  getProducts,
  getRelatedProducts,
} from "@/services/product-services";
import { Product } from "@/types/product";

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getProducts();
  const slug = products.data.map((product: Product) => ({
    slug: product.slug,
  }));
  console.log("slug:", slug);
  return slug;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { slug } = resolvedParams;

  const currentProduct = await getProduct(slug);
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
