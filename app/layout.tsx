import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { OfferBanner } from "@/components/shared/offer-banner";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { FloatingCart } from "@/components/shared/floating-cart";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pure Honey Shop - Premium Natural Honey from Bangladesh",
  description:
    "Discover the finest quality natural honey sourced directly from local beekeepers. 100% pure, organic, and following Sunnah traditions.",
  keywords:
    "honey, natural honey, organic honey, Bangladesh honey, pure honey, Sunnah honey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} bg-background`}
      >
        <OfferBanner />
        <Header />
        <main className="py-8">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <Footer />
        <FloatingCart />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
