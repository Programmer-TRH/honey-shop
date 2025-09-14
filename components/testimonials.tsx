import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Fatima Rahman",
    location: "Dhaka",
    avatar: "/woman-profile.png",
    rating: 5,
    text: "The best honey I have ever tasted! My family loves it and we use it daily. The quality is exceptional and delivery was very fast.",
    verified: true,
  },
  {
    name: "Ahmed Hassan",
    location: "Chittagong",
    avatar: "/man-profile.png",
    rating: 5,
    text: "Pure and natural honey as promised. I have been using it for my morning tea and it has improved my health significantly.",
    verified: true,
  },
  {
    name: "Rashida Begum",
    location: "Sylhet",
    avatar: "/elderly-woman-profile-photo.jpg",
    rating: 5,
    text: "Following Sunnah, I give honey to my children daily. This honey is pure and I can trust its quality completely.",
    verified: true,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied customers who trust us for their daily honey needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>

                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
