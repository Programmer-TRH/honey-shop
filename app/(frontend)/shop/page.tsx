import Shop from "@/components/layout/shop/shop";
import ShopHero from "@/components/layout/shop/shop-hero";

export const revalidate = 3600;

export default async function ShopPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/custom/products?page=1&limit=15`, {
    next: {
      tags: ["products"],
      revalidate: 3600,
    },
  });

  const productData = await res.json();

  return (
    <div className="container mx-auto p-4 md:py-8">
      <ShopHero />
      <div className="flex flex-col lg:flex-row gap-8">
        <Shop initialProducts={productData} />
      </div>
    </div>
  );
}
