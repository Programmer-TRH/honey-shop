import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";
import Link from "next/link";
import HoneyWithJar from "@/public/honey with jar.jpg";
import Image from "next/image";

export function FeaturedProduct() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20 mb-4"
          >
            Most Popular
          </Badge>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Signature Honey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            The perfect blend of taste and health benefits that our customers
            love most.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-border/50 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Product Image */}
              <div className="relative bg-muted/30 p-4 flex items-center justify-center">
                <div className="absolute inset-0 honeycomb-pattern opacity-30"></div>
                <Image
                  src={HoneyWithJar}
                  alt="Premium Honey 1000g"
                  className="relative z-10 max-w-full h-auto p-4"
                />
              </div>

              {/* Product Details */}
              <CardContent className="p-4 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (127 reviews)
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Premium Natural Honey
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our bestselling 500g jar of pure, unprocessed honey. Perfect
                  for daily consumption, cooking, and natural remedies.
                  Harvested from wildflower meadows for a rich, complex flavor.
                </p>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-3xl font-bold text-primary">৳850</div>
                  <div className="text-lg text-muted-foreground line-through">
                    ৳950
                  </div>
                  <Badge variant="destructive">Save ৳100</Badge>
                </div>

                <div className="flex items-center space-x-2 mb-6 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Trusted by 500+ families</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="flex-1">
                    <Link href="/shop/premium-honey">Order Now</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-transparent"
                  >
                    View Details
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Free delivery in Dhaka • Cash on Delivery available
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
