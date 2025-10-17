import { OfferBanner } from "@/components/shared/offer-banner";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import FloatingCart from "@/components/shared/floating-cart";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import LoadingSkeleton from "@/components/skeleton/loading-skeleton";

export default function FrontEndLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OfferBanner />
      <Header />
      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer />
      <Suspense fallback={<LoadingSkeleton />}>
        <FloatingCart />
      </Suspense>
      <Toaster />
    </>
  );
}
