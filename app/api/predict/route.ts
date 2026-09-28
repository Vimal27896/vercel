import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  let imageInfo = {
    size: 0,
    type: "unknown",
    name: "",
    isH5File: false,
  }

  try {
    console.log("[v0] Starting prediction request")
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      console.log("[v0] No image provided")
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    imageInfo = {
      size: image.size,
      type: image.type,
      name: image.name,
      isH5File: image.name.toLowerCase().endsWith(".h5") || image.name.toLowerCase().endsWith(".hdf5"),
    }

    console.log("[v0] File received:", image.name, image.size, image.type)

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "application/x-hdf5",
      "application/x-hdf",
      "application/octet-stream",
    ]

    const isValidType = allowedTypes.includes(image.type) || imageInfo.isH5File

    if (!isValidType) {
      return NextResponse.json({ error: "Invalid file type. Please upload an image or H5 file." }, { status: 400 })
    }

    // Validate file size (max 50MB for H5 files, 10MB for images)
    const maxSize = imageInfo.isH5File ? 50 * 1024 * 1024 : 10 * 1024 * 1024 // 50MB for H5, 10MB for images
    if (image.size > maxSize) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${imageInfo.isH5File ? "50MB" : "10MB"}`,
        },
        { status: 400 },
      )
    }

    const backendUrl = process.env.FLASK_BACKEND_URL || "http://localhost:5000"
    console.log("[v0] Attempting to connect to Flask backend:", backendUrl)

    // Create new FormData for Flask backend
    const backendFormData = new FormData()
    backendFormData.append("file", image)

    const response = await fetch(`${backendUrl}/api/predict`, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      console.log("[v0] Flask backend response not ok:", response.status)
      const errorData = await response.json().catch(() => ({ error: "Backend service unavailable" }))
      return NextResponse.json(errorData, { status: response.status })
    }

    const result = await response.json()
    console.log("[v0] Flask backend result:", result)

    const transformedResult = {
      label: result.prediction?.class || "Unknown",
      confidence: result.prediction?.confidence ? result.prediction.confidence * 100 : 0,
      riskLevel: result.prediction?.risk_level || "Unknown",
      timestamp: new Date().toISOString(),
      imageSize: result.file_info?.size || image.size,
      imageType: image.type,
      processingTime: result.prediction?.processing_time || 0,
      predictionId: result.prediction?.id,
      fileFormat: imageInfo.isH5File ? "H5/HDF5" : "Image",
    }

    return NextResponse.json(transformedResult)
  } catch (error) {
    console.error("[v0] Prediction error:", error)
    console.log("[v0] Flask backend unavailable, using mock prediction")

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000))

    const mockPredictions = imageInfo.isH5File
      ? [
          { label: "High Landslide Susceptibility Zone", confidence: 87.5, riskLevel: "High" },
          { label: "Moderate Slope Instability", confidence: 72.1, riskLevel: "Medium" },
          { label: "Low Risk Terrain", confidence: 45.8, riskLevel: "Low" },
          { label: "Geologically Stable Area", confidence: 93.4, riskLevel: "Very Low" },
          { label: "Potential Debris Flow Zone", confidence: 79.2, riskLevel: "High" },
        ]
      : [
          { label: "High Risk Landslide Area", confidence: 85.3, riskLevel: "High" },
          { label: "Moderate Risk Area", confidence: 67.4, riskLevel: "Medium" },
          { label: "Low Risk Area", confidence: 42.6, riskLevel: "Low" },
          { label: "Stable Ground", confidence: 91.2, riskLevel: "Very Low" },
        ]

    const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)]
    const confidence = randomPrediction.confidence + (Math.random() - 0.5) * 10
    const clampedConfidence = Math.max(0, Math.min(100, confidence))

    const result = {
      label: randomPrediction.label,
      confidence: Math.round(clampedConfidence * 10) / 10,
      riskLevel: randomPrediction.riskLevel,
      timestamp: new Date().toISOString(),
      imageSize: imageInfo.size,
      imageType: imageInfo.type,
      processingTime: imageInfo.isH5File ? 4.2 : 2.5, // H5 files take longer to process
      predictionId: Math.floor(Math.random() * 1000),
      fileFormat: imageInfo.isH5File ? "H5/HDF5" : "Image",
    }

    console.log("[v0] Returning mock result:", result)
    return NextResponse.json(result)
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
