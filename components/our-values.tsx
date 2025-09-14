import { Card, CardContent } from "@/components/ui/card"
import { Shield, Heart, Star } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Purity",
    description:
      "We never compromise on quality. Our honey is 100% pure, raw, and unprocessed, maintaining all its natural enzymes and health benefits.",
  },
  {
    icon: Heart,
    title: "Trust",
    description:
      "Built on transparency and honesty. Every jar comes with our guarantee of authenticity, and we're always available to answer your questions.",
  },
  {
    icon: Star,
    title: "Sunnah Tradition",
    description:
      "Following the blessed tradition of Prophet Muhammad (PBUH), we honor the sacred nature of honey and its role in Islamic wellness practices.",
  },
]

export function OurValues() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Core Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Three fundamental principles that guide everything we do, from sourcing to delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <Card key={index} className="text-center border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sunnah Quote Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
              </div>
              <blockquote className="font-serif text-lg md:text-xl text-foreground mb-4 italic">
                "Honey is a remedy for every illness and the Quran is a remedy for all illness of the mind, therefore I
                recommend to you both remedies, the Quran and honey."
              </blockquote>
              <cite className="text-muted-foreground">- Prophet Muhammad (PBUH)</cite>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
