import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const timeline = [
  {
    year: "2008",
    title: "How We Started",
    description:
      "Founded by a passionate beekeeper who believed in the healing power of pure honey. Started with just 5 hives in rural Bangladesh, following traditional methods passed down through generations.",
    image: "/small-beehive-farm-rural-bangladesh.jpg",
  },
  {
    year: "2015",
    title: "Growing Our Hives",
    description:
      "Expanded to work with local beekeepers across different regions of Bangladesh. Established quality control standards and began direct-to-consumer sales, ensuring freshness and purity.",
    image: "/multiple-beehives-different-locations-bangladesh.jpg",
  },
  {
    year: "2024",
    title: "Today's Trusted Brand",
    description:
      "Now serving 500+ families with premium honey varieties. Certified by BSTI, following Halal practices, and committed to supporting local beekeeping communities while maintaining the highest quality standards.",
    image: "/modern-honey-processing-facility-clean.jpg",
  },
]

export function OurStory() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Journey Through Time
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From humble beginnings to becoming Bangladesh's trusted honey brand, discover how we've maintained our
            commitment to purity and tradition.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <Card key={index} className="overflow-hidden border-border/50">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-lg px-3 py-1">
                      {item.year}
                    </Badge>
                  </div>

                  {/* Content */}
                  <CardContent
                    className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                  >
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
