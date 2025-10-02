import { Badge } from "@/components/ui/badge";

export default function BlogHero() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20 mb-6"
          >
            Health & Wellness
          </Badge>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            The Sweet Science of Honey
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
            Discover the incredible health benefits, traditional uses, and
            scientific insights about nature's golden treasure. Learn how honey
            can enhance your wellness journey.
          </p>
        </div>
      </div>
    </section>
  );
}
