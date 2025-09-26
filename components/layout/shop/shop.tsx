import { buildQueryString } from "@/lib/query/buildQueryString";
import ShopMain from "./shop-main";

export default async function Shop({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = await Promise.resolve(searchParams);
  const queryString = buildQueryString(params);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/products?${queryString.toString()}`);
  const productData = await res.json();

  return <ShopMain productData={productData} />;
}
