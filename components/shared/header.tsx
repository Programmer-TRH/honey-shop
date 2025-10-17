import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu, Phone, Heart, ShoppingCart } from "lucide-react";
import { UserMenu } from "./user-menu";
import WishlistBtn from "./wishlist-btn";
import ShoppingCartBtn from "./shopping-cart-btn";

export function Header() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Health Benefits", href: "/health-benefits" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <div className="h-4 w-4 bg-primary-foreground rounded-full opacity-80"></div>
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              Pure Honey
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">+880 1234-567890</span>
            </Button>

            <WishlistBtn />
            <ShoppingCartBtn />

            <UserMenu />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-4">
                <SheetTitle>
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <div className="h-4 w-4 bg-primary-foreground rounded-full opacity-80"></div>
                    </div>
                    <span className="font-serif text-xl font-bold text-foreground">
                      Pure Honey
                    </span>
                  </Link>
                </SheetTitle>
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t space-y-3">
                    <Link
                      href="/wishlist"
                      className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span>Wishlist (3)</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <span>View Cart</span>
                    </Link>
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
