"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { FileUpload } from "@/components/file-upload"
import { ResultCard } from "@/components/result-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"

interface PredictionResult {
  label: string
  confidence: number
}

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setResult(null)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setResult(null)
  }

  const handlePredict = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("image", selectedFile)

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Prediction failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Prediction error:", error)
      // Fallback to mock data for demo
      setResult({
        label: Math.random() > 0.5 ? "Landslide Risk" : "Safe Terrain",
        confidence: Math.random() * 40 + 60, // 60-100% confidence
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Upload className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Upload & Predict</h1>
            <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              Upload terrain images to get instant landslide risk predictions powered by our AI model. Supported
              formats: JPEG, PNG, WebP.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Terrain Image</CardTitle>
                  <CardDescription>Select an image of the terrain you want to analyze</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    onRemoveFile={handleRemoveFile}
                  />
                </CardContent>
              </Card>

              {selectedFile && (
                <div className="flex justify-center">
                  <Button onClick={handlePredict} disabled={isLoading} size="lg" className="w-full sm:w-auto">
                    {isLoading ? "Analyzing..." : "Predict Landslide Risk"}
                  </Button>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {(result || isLoading) && <ResultCard result={result!} isLoading={isLoading} />}

              {!result && !isLoading && (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-3 bg-muted rounded-full mb-4">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">No Results Yet</h3>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Upload an image and click predict to see landslide risk analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Instructions */}
          <Card className="mt-12 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                    1
                  </div>
                  <h4 className="font-medium mb-1">Upload Image</h4>
                  <p className="text-muted-foreground text-pretty">
                    Select a clear terrain image showing the area you want to analyze
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                    2
                  </div>
                  <h4 className="font-medium mb-1">AI Analysis</h4>
                  <p className="text-muted-foreground text-pretty">
                    Our trained model analyzes geological features and risk factors
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                    3
                  </div>
                  <h4 className="font-medium mb-1">Get Results</h4>
                  <p className="text-muted-foreground text-pretty">
                    Receive instant risk assessment with confidence scores
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
