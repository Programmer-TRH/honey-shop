import { Badge } from "@/components/ui/badge";
import { Users, Award, Heart, BookMarked } from "lucide-react";
import HoneyCompb from "@/public/honey comb.jpg";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative py-8 md:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={HoneyCompb}
          alt="Beekeeper working with hives"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="custom" size={"sm"} className=" mb-6">
            <BookMarked className="h-3 w-3 mr-1" />
            Our Story
          </Badge>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Pure Honey, Pure Tradition
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            For generations, we have been dedicated to bringing you the finest
            natural honey, following traditional beekeeping practices and Sunnah
            principles to ensure the highest quality and purity.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">
                Happy Families
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">15+</div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">
                Pure & Natural
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
