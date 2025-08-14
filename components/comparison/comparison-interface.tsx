"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ComparisonFilters } from "./comparison-filters"
import { ComparisonTable } from "@/components/results/comparison-table"
import { useProviders } from "@/hooks/use-providers"
import type { Plan, Provider, ScoredPlan } from "@/types/plan"
import { ExternalLink } from "lucide-react"

interface FilterState {
  priceRange: [number, number]
  companyTypes: string[]
  features: string[]
  nfLimit: number | null
  includePayroll: boolean | null
  includeAdvisory: boolean | null
}

export function ComparisonInterface() {
  const { providers, loading, error } = useProviders("contabilidade")
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    companyTypes: [],
    features: [],
    nfLimit: null,
    includePayroll: null,
    includeAdvisory: null,
  })
  const [showComparison, setShowComparison] = useState(false)

  const allPlans: ScoredPlan[] = providers.flatMap((provider) =>
    provider.plans.map((plan) => ({
      ...plan,
      provider,
      score: 0, // Default score for display purposes
      scoreBreakdown: {
        targetAlignment: 0,
        nfLimitMatch: 0,
        servicesMatch: 0,
        priceScore: 0,
        slaScore: 0,
        featuresBonus: 0,
      },
      badges: generateDisplayBadges(plan, provider),
    })),
  )

  const filteredPlans = allPlans.filter((plan) => {
    // Price filter
    if (plan.price_month < filters.priceRange[0] || plan.price_month > filters.priceRange[1]) {
      return false
    }

    // Company type filter
    if (filters.companyTypes.length > 0) {
      if (!filters.companyTypes.some((type) => plan.target.includes(type as any))) {
        return false
      }
    }

    // NF limit filter
    if (filters.nfLimit !== null) {
      if (plan.nf_limit_per_month !== null && plan.nf_limit_per_month < filters.nfLimit) {
        return false
      }
    }

    // Payroll filter
    if (filters.includePayroll !== null) {
      if (plan.payroll_included !== filters.includePayroll) {
        return false
      }
    }

    // Advisory filter
    if (filters.includeAdvisory !== null) {
      if (plan.advisory_included !== filters.includeAdvisory) {
        return false
      }
    }

    return true
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-64 w-full" />
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert>
        <AlertDescription>Erro ao carregar planos: {error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <ComparisonFilters filters={filters} onFiltersChange={setFilters} />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {filteredPlans.length} plano{filteredPlans.length !== 1 ? "s" : ""} encontrado
            {filteredPlans.length !== 1 ? "s" : ""}
          </h2>
          <p className="text-muted-foreground">
            {filters.priceRange[0] > 0 || filters.priceRange[1] < 500 || filters.companyTypes.length > 0
              ? "Filtros aplicados"
              : "Mostrando todos os planos disponíveis"}
          </p>
        </div>
        <Button
          onClick={() => setShowComparison(!showComparison)}
          variant="outline"
          disabled={filteredPlans.length === 0}
        >
          {showComparison ? "Ocultar" : "Ver"} Comparação
        </Button>
      </div>

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Nenhum plano encontrado</h3>
            <p className="text-muted-foreground mb-4">Tente ajustar os filtros para ver mais opções</p>
            <Button
              onClick={() =>
                setFilters({
                  priceRange: [0, 500],
                  companyTypes: [],
                  features: [],
                  nfLimit: null,
                  includePayroll: null,
                  includeAdvisory: null,
                })
              }
            >
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <motion.div layout className="grid gap-6">
          {filteredPlans.map((plan) => (
            <motion.div
              key={`${plan.provider.id}-${plan.id}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                      </div>
                      <p className="text-muted-foreground">
                        <span className="font-medium">{plan.provider.name}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{formatPrice(plan.price_month)}</div>
                      <div className="text-sm text-muted-foreground">por mês</div>
                      {plan.price_setup && (
                        <div className="text-sm text-muted-foreground">+ {formatPrice(plan.price_setup)} setup</div>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {plan.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quick Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">NF/mês:</span>
                      <div className="font-medium">
                        {plan.nf_limit_per_month ? plan.nf_limit_per_month : "Ilimitado"}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Folha:</span>
                      <div className="font-medium">{plan.payroll_included ? "Incluída" : "Não incluída"}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Consultoria:</span>
                      <div className="font-medium">{plan.advisory_included ? "Incluída" : "Não incluída"}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Público:</span>
                      <div className="font-medium">{plan.target.join(", ")}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium mb-2">Principais recursos:</h4>
                    <div className="grid sm:grid-cols-2 gap-1 text-sm">
                      {plan.features.slice(0, 6).map((feature) => (
                        <div key={feature} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button asChild className="w-full">
                    <a href={plan.provider.site_url} target="_blank" rel="noopener noreferrer">
                      Visitar Site do Provedor
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Comparison Table */}
      {showComparison && filteredPlans.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ComparisonTable plans={filteredPlans} />
        </motion.div>
      )}
    </div>
  )
}

function generateDisplayBadges(plan: Plan, provider: Provider): string[] {
  const badges: string[] = []

  if (plan.price_month <= 50) badges.push("Econômico")
  if (plan.price_month >= 300) badges.push("Premium")
  if (plan.payroll_included && plan.advisory_included) badges.push("Completo")
  if (plan.target.includes("MEI") && plan.price_month <= 60) badges.push("Ideal MEI")
  if (plan.nf_limit_per_month === null) badges.push("NF Ilimitada")
  if (plan.support_sla === "priority" || plan.support_sla === "phone") badges.push("Suporte Premium")

  return badges
}
