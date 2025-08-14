import type { Plan, Provider, UserInput, ScoredPlan } from "@/types/plan"

export function calculatePlanScore(plan: Plan, provider: Provider, input: UserInput): ScoredPlan {
  const scoreBreakdown = {
    targetAlignment: 0,
    nfLimitMatch: 0,
    servicesMatch: 0,
    priceScore: 0,
    slaScore: 0,
    featuresBonus: 0,
  }

  // Target alignment (20 points)
  if (plan.target.includes(input.tipoEmpresa)) {
    scoreBreakdown.targetAlignment = 20
  }

  // NF limit match (20 points)
  if (typeof plan.nf_limit_per_month === "number") {
    if (input.nfMes <= plan.nf_limit_per_month) {
      scoreBreakdown.nfLimitMatch = 20
    } else {
      scoreBreakdown.nfLimitMatch = -15 // Penalty for exceeding limit
    }
  } else {
    // Unlimited NF
    scoreBreakdown.nfLimitMatch = 20
  }

  // Services match (30 points total)
  if (input.servicos.folha && plan.payroll_included) {
    scoreBreakdown.servicesMatch += 15
  }
  if (input.servicos.consultoria && plan.advisory_included) {
    scoreBreakdown.servicesMatch += 15
  }

  // Price score (20 points) - lower price gets higher score
  scoreBreakdown.priceScore = calculatePriceScore(plan.price_month)

  // SLA score (10 points)
  scoreBreakdown.slaScore = calculateSLAScore(plan.support_sla)

  // Features bonus (up to 5 points)
  scoreBreakdown.featuresBonus = Math.min(plan.features.length, 5)

  const totalScore = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0)

  // Generate badges
  const badges = generateBadges(plan, totalScore, input)

  return {
    ...plan,
    provider,
    score: totalScore,
    scoreBreakdown,
    badges,
  }
}

function calculatePriceScore(price: number): number {
  // Price scoring: cheaper plans get higher scores
  if (price <= 50) return 20
  if (price <= 100) return 15
  if (price <= 200) return 10
  if (price <= 300) return 5
  return 0
}

function calculateSLAScore(sla?: string): number {
  switch (sla) {
    case "priority":
      return 10
    case "phone":
      return 8
    case "chat":
      return 6
    case "email":
      return 4
    default:
      return 0
  }
}

function generateBadges(plan: Plan, score: number, input: UserInput): string[] {
  const badges: string[] = []

  // Score-based badges
  if (score >= 80) badges.push("Recomendado")
  if (score >= 70 && score < 80) badges.push("Boa Opção")

  // Price-based badges
  if (plan.price_month <= 50) badges.push("Melhor Custo")
  if (plan.price_month >= 300) badges.push("Premium")

  // Feature-based badges
  if (plan.payroll_included && plan.advisory_included) badges.push("Mais Completo")
  if (plan.target.includes("MEI") && plan.price_month <= 60) badges.push("Ideal p/ MEI")

  // Service-specific badges
  if (plan.support_sla === "priority" || plan.support_sla === "phone") badges.push("Suporte Premium")
  if (plan.nf_limit_per_month === null) badges.push("NF Ilimitada")

  return badges
}

export function rankPlans(plans: Plan[], providers: Provider[], input: UserInput): ScoredPlan[] {
  const scoredPlans: ScoredPlan[] = []

  for (const provider of providers) {
    for (const plan of provider.plans) {
      const scoredPlan = calculatePlanScore(plan, provider, input)
      scoredPlans.push(scoredPlan)
    }
  }

  // Sort by score (descending), then by price (ascending)
  return scoredPlans.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return a.price_month - b.price_month
  })
}
