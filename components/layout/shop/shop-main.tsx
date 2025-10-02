import Shop from "./shop";

export const revalidate = 3600;

export default async function ShopMain() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/custom/products?page=1&limit=15`, {
    next: {
      tags: ["products"],
      revalidate: 3600,
    },
  });

  const productData = await res.json();

  return <Shop initialProducts={productData} />;
}
