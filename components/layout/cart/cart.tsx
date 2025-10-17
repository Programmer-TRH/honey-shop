import { CartContent } from "./cart-content";
import { isAuthenticated } from "@/dal/isAuthenticated";
import { getCart } from "@/services/cart-service";

export default async function Cart() {
  const { isAuth, userId } = await isAuthenticated();
  if (!isAuth) {
    return;
  }
  const data = await getCart(userId!);
  return <CartContent result={data} />;
}
