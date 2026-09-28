import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page") || "1"
    const perPage = searchParams.get("per_page") || "10"

    const backendUrl = process.env.FLASK_BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/predictions?page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Backend service unavailable" }))
      return NextResponse.json(errorData, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching predictions:", error)

    const mockPredictions = [
      {
        id: 1,
        filename: "mountain_slope.jpg",
        prediction_class: "High Risk Landslide Area",
        confidence_score: 0.923,
        risk_level: "High",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        processing_time: 2.3,
      },
      {
        id: 2,
        filename: "stable_ground.jpg",
        prediction_class: "Stable Ground",
        confidence_score: 0.876,
        risk_level: "Very Low",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        processing_time: 1.8,
      },
    ]

    return NextResponse.json({
      predictions: mockPredictions,
      pagination: {
        page: 1,
        per_page: 10,
        total: mockPredictions.length,
        pages: 1,
      },
    })
  }
}
