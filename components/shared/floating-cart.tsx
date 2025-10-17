import { isAuthenticated } from "@/dal/isAuthenticated";
import { FloatingCartContent } from "./floating-cart-content";
import { getCart } from "@/services/cart-service";

export default async function FloatingCart() {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) {
    return;
  }
  const data = await getCart(userId!);
  return <FloatingCartContent result={data} />;
}
