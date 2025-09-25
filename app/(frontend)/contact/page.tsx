import { ContactForm } from "@/components/layout/contact/contact-form";
import { ContactInfo } from "@/components/layout/contact/contact-info";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Badge
                variant="secondary"
                className="bg-primary/15 text-primary border-primary/30 px-4 py-2"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                24/7 Customer Support
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-50 text-green-700 border-green-200 px-4 py-2"
              >
                <Phone className="h-4 w-4 mr-2" />
                Instant Response
              </Badge>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              We're Here to Help You
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              Have questions about our honey? Our dedicated team is ready to
              assist you in finding the perfect natural sweetness for your
              family.
            </p>

            <div className="flex justify-center items-center space-x-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Average response time: Under 2 hours
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </>
  );
}
