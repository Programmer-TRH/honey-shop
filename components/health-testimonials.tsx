import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Sarah Ahmed",
    title: "Nutritionist, Dhaka Medical College",
    content:
      "I recommend this pure honey to my patients for its exceptional quality and proven health benefits. The difference in energy levels and immune function is remarkable.",
    rating: 5,
    image: "/doctor-testimonial.jpg",
  },
  {
    name: "Fatima Rahman",
    title: "Mother of 3, Dhaka",
    content:
      "My children's cough and cold symptoms improved dramatically after switching to this honey. It's now our go-to natural remedy for the whole family.",
    rating: 5,
    image: "/customer-testimonial-1.jpg",
  },
  {
    name: "Ahmed Hassan",
    title: "Fitness Trainer, Chittagong",
    content:
      "As a fitness professional, I've tried many energy supplements. Nothing beats the sustained energy and recovery benefits I get from this pure honey.",
    rating: 5,
    image: "/customer-testimonial-2.jpg",
  },
]

export function HealthTestimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Health Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real people sharing their health transformation with our pure honey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
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
