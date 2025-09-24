import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Zap, Brain, Droplets, Moon, Thermometer, Leaf } from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Heart Health",
    description: "Rich in antioxidants that help reduce heart disease risk and lower blood pressure naturally.",
    color: "text-red-500",
  },
  {
    icon: Shield,
    title: "Immune Booster",
    description: "Natural antibacterial and antiviral properties strengthen your immune system against infections.",
    color: "text-green-500",
  },
  {
    icon: Zap,
    title: "Natural Energy",
    description: "Quick-absorbing natural sugars provide sustained energy without blood sugar spikes.",
    color: "text-primary",
  },
  {
    icon: Brain,
    title: "Brain Function",
    description: "Improves memory, concentration, and cognitive function with natural brain-boosting compounds.",
    color: "text-purple-500",
  },
  {
    icon: Droplets,
    title: "Wound Healing",
    description: "Accelerates healing of cuts, burns, and wounds with natural antimicrobial properties.",
    color: "text-blue-500",
  },
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Natural tryptophan helps regulate sleep cycles and promotes deeper, more restful sleep.",
    color: "text-indigo-500",
  },
  {
    icon: Thermometer,
    title: "Cough Relief",
    description: "Soothes throat irritation and reduces cough symptoms better than many medications.",
    color: "text-orange-500",
  },
  {
    icon: Leaf,
    title: "Digestive Health",
    description: "Promotes healthy gut bacteria and aids digestion while reducing stomach inflammation.",
    color: "text-green-600",
  },
]

export function BenefitsGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">8 Proven Health Benefits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each spoonful of our pure honey delivers powerful health benefits backed by scientific research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-2 hover:border-primary/30 transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <benefit.icon className={`h-12 w-12 ${benefit.color} mx-auto mb-4`} />
                <h3 className="font-semibold text-lg mb-3">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
