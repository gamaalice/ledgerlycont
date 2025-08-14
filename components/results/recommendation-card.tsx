"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { ScoredPlan, UserInput } from "@/types/plan"
import { ExternalLink, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface RecommendationCardProps {
  plan: ScoredPlan
  isTopRecommendation: boolean
  userInput: UserInput
}

export function RecommendationCard({ plan, isTopRecommendation, userInput }: RecommendationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excelente"
    if (score >= 60) return "Bom"
    return "Regular"
  }

  return (
    <Card className={`transition-all hover:shadow-lg ${isTopRecommendation ? "ring-2 ring-primary" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className={`text-2xl font-bold ${getScoreColor(plan.score)}`}>
                {plan.score}
                <span className="text-sm font-normal text-muted-foreground ml-1">pts</span>
              </div>
            </div>
            <CardDescription className="text-base">
              <span className="font-medium">{plan.provider.name}</span> • {getScoreLabel(plan.score)} para seu perfil
            </CardDescription>
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
            <Badge key={badge} variant={badge === "Recomendado" ? "default" : "secondary"}>
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Features */}
        <div>
          <h4 className="font-medium mb-3">Principais recursos:</h4>
          <div className="grid sm:grid-cols-2 gap-2">
            {plan.features.slice(0, 6).map((feature) => (
              <div key={feature} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Compatibility Check */}
        <div>
          <h4 className="font-medium mb-3">Compatibilidade com seu perfil:</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              {plan.target.includes(userInput.tipoEmpresa) ? (
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500 mr-2" />
              )}
              Adequado para {userInput.tipoEmpresa}
            </div>

            <div className="flex items-center text-sm">
              {plan.nf_limit_per_month === null || userInput.nfMes <= plan.nf_limit_per_month ? (
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
              )}
              {plan.nf_limit_per_month === null
                ? "Notas fiscais ilimitadas"
                : `Suporta até ${plan.nf_limit_per_month} NF/mês (você precisa de ${userInput.nfMes})`}
            </div>

            {userInput.servicos.folha && (
              <div className="flex items-center text-sm">
                {plan.payroll_included ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                )}
                Folha de pagamento {plan.payroll_included ? "incluída" : "não incluída"}
              </div>
            )}

            {userInput.servicos.consultoria && (
              <div className="flex items-center text-sm">
                {plan.advisory_included ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                )}
                Consultoria contábil {plan.advisory_included ? "incluída" : "não incluída"}
              </div>
            )}
          </div>
        </div>

        {/* Constraints */}
        {plan.constraints && plan.constraints.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium mb-3 text-yellow-700">Limitações:</h4>
              <div className="space-y-1">
                {plan.constraints.map((constraint) => (
                  <div key={constraint} className="flex items-center text-sm text-yellow-700">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {constraint}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Action Button */}
        <div className="pt-4">
          <Button asChild className="w-full" size="lg">
            <a href={plan.provider.site_url} target="_blank" rel="noopener noreferrer">
              Visitar Site do Provedor
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
