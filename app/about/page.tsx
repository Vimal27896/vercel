import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Target, Zap, Brain, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Shield className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-6">About Landslide Shield</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Pioneering AI-driven landslide prediction technology to protect communities and save lives through early
              warning systems and risk assessment.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle>Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  To leverage cutting-edge artificial intelligence and machine learning technologies to predict
                  landslide risks with unprecedented accuracy, providing communities with the early warnings they need
                  to protect lives and property.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle>Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  A world where landslide disasters are predicted and prevented, where communities are empowered with
                  real-time risk information, and where technology serves as a shield against natural disasters.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technology */}
          <Card className="mb-16">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-6 w-6 text-primary" />
                <CardTitle>Advanced AI Technology</CardTitle>
                <CardDescription>Powered by state-of-the-art machine learning models</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Landslide Shield utilizes deep learning neural networks trained on thousands of geological images and
                environmental data points. Our models analyze terrain features, slope stability, vegetation patterns,
                and weather conditions to provide accurate risk assessments.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Computer Vision</h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Advanced image analysis to identify geological risk factors
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Predictive Modeling</h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Machine learning algorithms for accurate risk prediction
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Real-time Analysis</h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Instant processing and risk assessment capabilities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle>Use Cases & Applications</CardTitle>
              <CardDescription>How Landslide Shield protects communities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Emergency
                    </Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Emergency Response</h4>
                      <p className="text-sm text-muted-foreground text-pretty">
                        Rapid risk assessment for emergency responders and disaster management teams
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Planning
                    </Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Urban Planning</h4>
                      <p className="text-sm text-muted-foreground text-pretty">
                        Risk assessment for construction projects and infrastructure development
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Insurance
                    </Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Insurance Assessment</h4>
                      <p className="text-sm text-muted-foreground text-pretty">
                        Property risk evaluation for insurance companies and real estate
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Research
                    </Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Scientific Research</h4>
                      <p className="text-sm text-muted-foreground text-pretty">
                        Supporting geological research and environmental monitoring studies
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Education
                    </Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Educational Tools</h4>
                      <p className="text-sm text-muted-foreground text-pretty">
                        Teaching resources for geology and environmental science programs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Monitoring
                    </Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Continuous Monitoring</h4>
                      <p className="text-sm text-muted-foreground text-pretty">
                        Long-term risk monitoring for vulnerable communities and infrastructure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="mb-16">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Our Team</CardTitle>
                <CardDescription>Experts in AI, geology, and disaster management</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty leading-relaxed mb-6">
                Landslide Shield is developed by a multidisciplinary team of machine learning engineers, geologists,
                environmental scientists, and disaster management experts. Our diverse expertise ensures that our
                technology is both scientifically sound and practically applicable.
              </p>

              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">AI Engineers</h4>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Geologists</h4>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Safety Experts</h4>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Researchers</h4>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="text-muted-foreground mb-6 text-pretty max-w-2xl mx-auto">
                Interested in collaborating, contributing data, or implementing Landslide Shield in your community? We'd
                love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="outline" className="px-4 py-2">
                  Research Partnerships
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  Data Collaboration
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  Community Implementation
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
