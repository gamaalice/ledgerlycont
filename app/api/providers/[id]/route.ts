import { NextResponse } from "next/server"
import { loadProviderById } from "@/lib/data-loader"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const provider = await loadProviderById(params.id)

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          error: "Provider not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: provider,
    })
  } catch (error) {
    console.error(`Error fetching provider ${params.id}:`, error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch provider",
      },
      { status: 500 },
    )
  }
}
