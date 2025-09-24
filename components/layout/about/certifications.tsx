import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, CheckCircle } from "lucide-react"

export function Certifications() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Quality Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our commitment to quality is backed by official certifications and rigorous testing standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center border-border/50">
            <CardContent className="p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">BSTI Certified</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Certified by Bangladesh Standards and Testing Institution for quality and purity standards.
              </p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Verified
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center border-border/50">
            <CardContent className="p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Halal Guaranteed</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Following Islamic principles in all aspects of production, processing, and packaging.
              </p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Certified
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center border-border/50">
            <CardContent className="p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Lab Tested</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Regular laboratory testing for purity, moisture content, and absence of adulterants.
              </p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Tested
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Image */}
        <div className="mt-12 text-center">
          <Card className="inline-block border-border/50">
            <CardContent className="p-6">
              <img
                src="/bsti-certificate-honey-quality.jpg"
                alt="BSTI Certificate"
                className="max-w-full h-auto rounded-lg"
              />
              <p className="text-sm text-muted-foreground mt-4">Official BSTI Quality Certificate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
