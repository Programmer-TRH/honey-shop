import ShopMain from "./shop-main";
import { Suspense } from "react";

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopMain />
    </Suspense>
  );
}
