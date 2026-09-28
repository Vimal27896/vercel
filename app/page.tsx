import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, MapPin, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Shield className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Landslide Shield</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Advanced AI-powered landslide prediction system that analyzes terrain and environmental data to provide
            early warnings and risk assessments for communities at risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/upload">Start Prediction</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Our Mission</CardTitle>
              <CardDescription className="text-lg">
                Protecting communities through intelligent early warning systems
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Landslide Shield leverages cutting-edge artificial intelligence to analyze geological, meteorological,
                and topographical data, providing accurate landslide risk predictions. Our mission is to save lives and
                protect infrastructure by delivering timely warnings to communities in landslide-prone areas, enabling
                proactive disaster preparedness and response.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-orange-500" />
              </div>
              <CardTitle>Early Warning System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">
                Get advance notifications of potential landslide risks based on real-time environmental monitoring and
                AI analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-blue-500" />
              </div>
              <CardTitle>Terrain Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">
                Advanced geological assessment using satellite imagery and topographical data to identify high-risk
                areas.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle>Instant Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">
                Upload terrain images and receive immediate risk assessments powered by our trained machine learning
                models.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 text-pretty">
                Upload your terrain images and get instant landslide risk predictions
              </p>
              <Button asChild size="lg">
                <Link href="/upload">Upload & Predict</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
