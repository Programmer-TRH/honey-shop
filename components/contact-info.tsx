import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Phone</h3>
              <p className="text-muted-foreground">+880 1234-567890</p>
              <p className="text-sm text-muted-foreground">Available 9 AM - 8 PM</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-muted-foreground">info@purehoney.bd</p>
              <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Location</h3>
              <p className="text-muted-foreground">Dhaka, Bangladesh</p>
              <p className="text-sm text-muted-foreground">Serving nationwide</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
              <p className="text-muted-foreground">Sunday - Thursday: 9 AM - 8 PM</p>
              <p className="text-muted-foreground">Friday - Saturday: 10 AM - 6 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">WhatsApp Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get instant support and place orders directly through WhatsApp
          </p>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat on WhatsApp
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-3">Delivery Coverage</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dhaka City</span>
              <span className="text-green-600 font-medium">Free delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Greater Dhaka</span>
              <span className="text-muted-foreground">৳60</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Outside Dhaka</span>
              <span className="text-muted-foreground">৳120</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
