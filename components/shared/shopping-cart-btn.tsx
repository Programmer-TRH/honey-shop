import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function ShoppingCartBtn() {
  return (
    <Button variant="outline" size="sm" className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4" />
      </Link>
    </Button>
  );
}
