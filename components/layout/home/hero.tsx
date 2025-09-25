import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Award, Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroImage from "@/public/hero-img.jpg";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 honeycomb-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5"></div>

      {/* Hero Image */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block p-4">
          <Image
            src={HeroImage}
            alt="Premium honey jar with natural honeycomb"
            className="h-full w-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/30"></div>
        </div>
        <div className="max-w-2xl lg:max-w-xl">
          <Badge variant="custom" size="sm" className="mb-2">
            <Shield className="h-4 w-4 mr-2" />
            100% Pure & Natural
          </Badge>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-700">4.9</span>
            <span className="text-gray-500">(1,200+ reviews)</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance leading-tight">
            Bangladesh's
            <span className="text-primary block "> #1 Pure Honey</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            From Honeycomb to your table - Experience nature's golden treasure
            with
            <span className="text-primary font-semibold">
              {" "}
              guaranteed purity
            </span>{" "}
            and
            <span className="text-primary font-semibold"> authentic taste</span>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all group"
            >
              <Link href="/shop">
                <span className="mr-2">🍯</span>
                Order Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-2 group"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <div className=" size-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">5K+</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Happy Customers</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">24h</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Instant Delivery</p>
                <p className="text-sm text-gray-500">In Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Award Winning</p>
                <p className="text-sm text-gray-500">Quality assured</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
