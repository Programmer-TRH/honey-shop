import { Card, CardContent } from "@/components/ui/card"
import { Clock, Coffee, Utensils, Moon } from "lucide-react"

const usageTips = [
  {
    icon: Coffee,
    time: "Morning",
    title: "Start Your Day",
    description: "1 tablespoon with warm water or tea for natural energy and immune support.",
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: Utensils,
    time: "Pre-Workout",
    title: "Natural Pre-Workout",
    description: "1-2 tablespoons 30 minutes before exercise for sustained energy without crashes.",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: Clock,
    time: "Afternoon",
    title: "Energy Boost",
    description: "Replace processed snacks with honey on whole grain toast or with nuts.",
    color: "bg-blue-50 border-blue-200",
  },
  {
    icon: Moon,
    time: "Evening",
    title: "Better Sleep",
    description: "1 teaspoon with warm milk before bed to promote restful sleep naturally.",
    color: "bg-purple-50 border-purple-200",
  },
]

export function HowToUse() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">How to Use Honey Daily</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maximize honey's health benefits with these simple daily routines recommended by nutritionists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usageTips.map((tip, index) => (
            <Card key={index} className={`border-2 ${tip.color} hover:shadow-lg transition-all`}>
              <CardContent className="p-6 text-center">
                <tip.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{tip.time}</div>
                <h3 className="font-semibold text-lg mb-3">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center">
          <h3 className="font-semibold text-xl mb-4">Daily Recommended Amount</h3>
          <p className="text-muted-foreground mb-4">
            Adults: 2-3 tablespoons daily | Children (1-12 years): 1-2 teaspoons daily
          </p>
          <p className="text-sm text-muted-foreground">
            Always consult your healthcare provider before giving honey to children under 1 year.
          </p>
        </div>
      </div>
    </section>
  )
}
