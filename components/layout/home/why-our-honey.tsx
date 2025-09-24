import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Droplets, Heart, Award } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Pure & Natural",
    description: "No artificial additives or preservatives. Just pure honey as nature intended.",
  },
  {
    icon: Droplets,
    title: "Raw & Unprocessed",
    description: "Minimally processed to retain all natural enzymes, vitamins, and minerals.",
  },
  {
    icon: Heart,
    title: "Health Benefits",
    description: "Rich in antioxidants, antibacterial properties, and natural healing compounds.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Sourced from the finest apiaries with strict quality control standards.",
  },
]

export function WhyOurHoney() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Why Choose Our Honey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover what makes our honey special and why thousands of families trust us for their daily wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
