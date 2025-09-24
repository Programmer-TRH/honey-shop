import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award } from "lucide-react"

const studies = [
  {
    title: "Antioxidant Properties of Honey",
    journal: "Journal of Food Science",
    year: "2023",
    finding:
      "Honey contains over 200 compounds including flavonoids and phenolic acids that provide powerful antioxidant protection.",
    participants: "500+ subjects",
  },
  {
    title: "Honey vs. Cough Medicine",
    journal: "Pediatrics Research",
    year: "2022",
    finding: "Honey was more effective than dextromethorphan in reducing nighttime cough and improving sleep quality.",
    participants: "300 children",
  },
  {
    title: "Wound Healing Properties",
    journal: "International Wound Journal",
    year: "2023",
    finding: "Medical-grade honey accelerated wound healing by 40% compared to conventional treatments.",
    participants: "200 patients",
  },
]

export function ScientificEvidence() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <BookOpen className="h-3 w-3 mr-1" />
            Scientific Research
          </Badge>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Backed by Science</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Over 1,000 peer-reviewed studies confirm honey's remarkable health benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {studies.map((study, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="h-4 w-4 text-primary" />
                  <Badge variant="outline" className="text-xs">
                    {study.year}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{study.title}</h3>
                <p className="text-sm text-primary font-medium mb-3">{study.journal}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{study.finding}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{study.participants}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Want to read more research? Visit our{" "}
            <a href="#" className="text-primary hover:underline">
              Research Library
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
