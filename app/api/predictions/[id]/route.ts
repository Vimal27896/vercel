import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const backendUrl = process.env.FLASK_BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/predictions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Prediction not found" }))
      return NextResponse.json(errorData, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error fetching prediction ${params.id}:`, error)
    return NextResponse.json({ error: "Prediction not found" }, { status: 404 })
  }
}
