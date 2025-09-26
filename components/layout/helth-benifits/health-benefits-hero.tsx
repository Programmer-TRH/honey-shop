import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Zap } from "lucide-react";
import Link from "next/link";

export function HealthBenefitsHero() {
  return (
    <section className="relative py-8 md:py-16 bg-gradient-to-br from-green-50 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20 mb-6"
          >
            <Heart className="h-3 w-3 mr-1" />
            Scientifically Proven Health Benefits
          </Badge>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Nature's Most Powerful
            <span className="text-primary block">Medicine</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed max-w-3xl mx-auto">
            Discover why honey has been treasured for over 4,000 years as both
            food and medicine. Our pure, unprocessed honey contains over 200
            beneficial compounds that support your health naturally.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 border">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Antibacterial</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 border">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Heart Healthy</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 border">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Energy Boost</span>
            </div>
          </div>

          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/shop">Start Your Health Journey</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
