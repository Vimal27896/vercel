"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, XCircle, FileIcon, ImageIcon, Clock } from "lucide-react"

interface PredictionResult {
  label: string
  confidence: number
  riskLevel?: string
  timestamp?: string
  imageSize?: number
  imageType?: string
  processingTime?: number
  predictionId?: number
  fileFormat?: string
}

interface ResultCardProps {
  result: PredictionResult
  isLoading: boolean
}

export function ResultCard({ result, isLoading }: ResultCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing Terrain...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
            <Progress value={undefined} className="w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const getRiskLevel = (confidence: number) => {
    if (confidence >= 80) return "high"
    if (confidence >= 60) return "medium"
    return "low"
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "default"
    }
  }

  const getRiskIcon = (label: string, confidence: number) => {
    if (label.toLowerCase().includes("landslide") && confidence >= 70) {
      return <AlertTriangle className="h-5 w-5 text-destructive" />
    }
    if (label.toLowerCase().includes("safe") || label.toLowerCase().includes("stable") || confidence < 30) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    return <XCircle className="h-5 w-5 text-muted-foreground" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const riskLevel = getRiskLevel(result.confidence)
  const isH5File = result.fileFormat === "H5/HDF5"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getRiskIcon(result.label, result.confidence)}
          Prediction Result
          {isH5File && <FileIcon className="h-4 w-4 text-blue-500" />}
          {!isH5File && <ImageIcon className="h-4 w-4 text-green-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Classification:</span>
            <Badge variant={getRiskColor(riskLevel)} className="capitalize">
              {result.label}
            </Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Confidence:</span>
            <span className="font-mono">{result.confidence.toFixed(1)}%</span>
          </div>
          <Progress value={result.confidence} className="w-full" />
        </div>

        {(result.imageSize || result.processingTime || result.fileFormat) && (
          <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
            {result.fileFormat && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Format:</span>
                <Badge variant="outline" className="text-xs">
                  {result.fileFormat}
                </Badge>
              </div>
            )}
            {result.imageSize && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Size:</span>
                <span className="text-sm text-muted-foreground">{formatFileSize(result.imageSize)}</span>
              </div>
            )}
            {result.processingTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span className="text-sm font-medium">Time:</span>
                <span className="text-sm text-muted-foreground">{result.processingTime.toFixed(1)}s</span>
              </div>
            )}
            {result.predictionId && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">ID:</span>
                <span className="text-sm text-muted-foreground font-mono">#{result.predictionId}</span>
              </div>
            )}
          </div>
        )}

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Risk Assessment</h4>
          <p className="text-sm text-muted-foreground text-pretty">
            {isH5File
              ? result.label.toLowerCase().includes("landslide") ||
                (result.label.toLowerCase().includes("susceptibility") && result.confidence >= 70)
                ? "High landslide susceptibility detected in geospatial data. Recommend detailed geological survey and monitoring systems."
                : result.confidence >= 50
                  ? "Moderate geological risk identified. Continue monitoring terrain conditions and implement preventive measures."
                  : "Low geological risk detected. Terrain data indicates stable conditions under current parameters."
              : result.label.toLowerCase().includes("landslide") && result.confidence >= 70
                ? "High landslide risk detected. Consider evacuation procedures and contact local authorities."
                : result.confidence >= 50
                  ? "Moderate risk detected. Continue monitoring conditions and stay alert to changes."
                  : "Low risk detected. Area appears stable under current conditions."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
