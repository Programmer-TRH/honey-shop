import { FloatingCartContent } from "./floating-cart-content";

export default async function FloatingCart() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/cart`);
  const data = await response.json();
  return <FloatingCartContent result={data} />;
}
