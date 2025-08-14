import { NextResponse } from "next/server"
import { loadProviders } from "@/lib/data-loader"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const providers = await loadProviders()

    const filteredProviders = category ? providers.filter((provider) => provider.category === category) : providers

    return NextResponse.json({
      success: true,
      data: filteredProviders,
      count: filteredProviders.length,
    })
  } catch (error) {
    console.error("Error fetching providers:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch providers",
      },
      { status: 500 },
    )
  }
}
