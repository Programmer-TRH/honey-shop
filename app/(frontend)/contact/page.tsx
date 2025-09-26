import { ContactForm } from "@/components/layout/contact/contact-form";
import { ContactInfo } from "@/components/layout/contact/contact-info";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <div className="container mx-auto p-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="custom" size={"sm"} className=" mb-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              24/7 Customer Support
            </Badge>

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
