"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ScoredPlan } from "@/types/plan"
import { ExternalLink, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ComparisonTableProps {
  plans: ScoredPlan[]
}

export function ComparisonTable({ plans }: ComparisonTableProps) {
  const [selectedPlans, setSelectedPlans] = useState<string[]>(plans.slice(0, 3).map((p) => `${p.provider.id}-${p.id}`))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const togglePlan = (planId: string) => {
    setSelectedPlans((prev) =>
      prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId].slice(0, 4),
    )
  }

  const selectedPlanData = plans.filter((plan) => selectedPlans.includes(`${plan.provider.id}-${plan.id}`))

  const comparisonRows = [
    {
      label: "Preço Mensal",
      key: "price_month",
      render: (plan: ScoredPlan) => formatPrice(plan.price_month),
    },
    {
      label: "Taxa de Setup",
      key: "price_setup",
      render: (plan: ScoredPlan) => (plan.price_setup ? formatPrice(plan.price_setup) : "Grátis"),
    },
    {
      label: "Limite NF/Mês",
      key: "nf_limit_per_month",
      render: (plan: ScoredPlan) => (plan.nf_limit_per_month ? plan.nf_limit_per_month.toString() : "Ilimitado"),
    },
    {
      label: "Folha de Pagamento",
      key: "payroll_included",
      render: (plan: ScoredPlan) =>
        plan.payroll_included ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        ),
    },
    {
      label: "Consultoria",
      key: "advisory_included",
      render: (plan: ScoredPlan) =>
        plan.advisory_included ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        ),
    },
    {
      label: "Suporte",
      key: "support_sla",
      render: (plan: ScoredPlan) => {
        const slaLabels = {
          email: "Email",
          chat: "Chat",
          phone: "Telefone",
          priority: "Prioritário",
        }
        return plan.support_sla ? slaLabels[plan.support_sla] : "Não especificado"
      },
    },
    {
      label: "Público-Alvo",
      key: "target",
      render: (plan: ScoredPlan) => (
        <div className="flex gap-1">
          {plan.target.map((target) => (
            <Badge key={target} variant="outline" className="text-xs">
              {target}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      label: "Pontuação",
      key: "score",
      render: (plan: ScoredPlan) => <div className="font-bold text-lg text-primary">{plan.score}/105</div>,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparação Detalhada</CardTitle>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Selecione até 4 planos para comparar lado a lado. Clique nos checkboxes abaixo para personalizar sua
            comparação.
          </p>

          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {plans.map((plan) => {
              const planId = `${plan.provider.id}-${plan.id}`
              const isSelected = selectedPlans.includes(planId)

              return (
                <div key={planId} className="flex items-center space-x-2">
                  <Checkbox
                    id={planId}
                    checked={isSelected}
                    onCheckedChange={() => togglePlan(planId)}
                    disabled={!isSelected && selectedPlans.length >= 4}
                  />
                  <label htmlFor={planId} className="text-sm cursor-pointer flex-1">
                    <span className="font-medium">{plan.name}</span>
                    <span className="text-muted-foreground ml-1">({plan.provider.name})</span>
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {selectedPlanData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Selecione pelo menos um plano para comparar</div>
        ) : (
          <ScrollArea className="w-full">
            <div className="min-w-[800px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Características</th>
                    {selectedPlanData.map((plan) => (
                      <th key={`${plan.provider.id}-${plan.id}`} className="text-center p-4 min-w-[200px]">
                        <div className="space-y-2">
                          <div className="font-semibold">{plan.name}</div>
                          <div className="text-sm text-muted-foreground">{plan.provider.name}</div>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {plan.badges.slice(0, 2).map((badge) => (
                              <Badge key={badge} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.key} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{row.label}</td>
                      {selectedPlanData.map((plan) => (
                        <td key={`${plan.provider.id}-${plan.id}`} className="p-4 text-center">
                          {row.render(plan)}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Features Comparison */}
                  <tr className="border-b">
                    <td className="p-4 font-medium align-top">Recursos Principais</td>
                    {selectedPlanData.map((plan) => (
                      <td key={`${plan.provider.id}-${plan.id}`} className="p-4 align-top">
                        <ul className="text-sm space-y-1">
                          {plan.features.slice(0, 5).map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                              <span className="text-left">{feature}</span>
                            </li>
                          ))}
                          {plan.features.length > 5 && (
                            <li className="text-muted-foreground text-xs">+{plan.features.length - 5} mais</li>
                          )}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Constraints */}
                  <tr className="border-b">
                    <td className="p-4 font-medium align-top">Limitações</td>
                    {selectedPlanData.map((plan) => (
                      <td key={`${plan.provider.id}-${plan.id}`} className="p-4 align-top">
                        {plan.constraints && plan.constraints.length > 0 ? (
                          <ul className="text-sm space-y-1">
                            {plan.constraints.map((constraint, index) => (
                              <li key={index} className="flex items-start">
                                <AlertCircle className="w-3 h-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" />
                                <span className="text-left">{constraint}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted-foreground text-sm">Nenhuma limitação informada</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Action Buttons */}
                  <tr>
                    <td className="p-4 font-medium">Ação</td>
                    {selectedPlanData.map((plan) => (
                      <td key={`${plan.provider.id}-${plan.id}`} className="p-4">
                        <Button asChild size="sm" className="w-full">
                          <a href={plan.provider.site_url} target="_blank" rel="noopener noreferrer">
                            Visitar Site
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
