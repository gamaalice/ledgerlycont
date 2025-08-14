import { NextResponse } from "next/server"
import { loadProvidersByCategory } from "@/lib/data-loader"
import { rankPlans } from "@/lib/scoring"
import { UserInputSchema } from "@/lib/schemas"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const userInput = UserInputSchema.parse(body)

    // Load accounting providers
    const providers = await loadProvidersByCategory("contabilidade")

    if (providers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No providers found",
        },
        { status: 404 },
      )
    }

    // Get all plans from providers
    const allPlans = providers.flatMap((provider) => provider.plans)

    // Rank plans based on user input
    const rankedPlans = rankPlans(allPlans, providers, userInput)

    // Get top 5 recommendations
    const recommendations = rankedPlans.slice(0, 5)

    return NextResponse.json({
      success: true,
      data: {
        recommendations,
        total_plans: rankedPlans.length,
        user_input: userInput,
        generated_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error in comparison:", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input data",
          details: error.message,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process comparison",
      },
      { status: 500 },
    )
  }
}
