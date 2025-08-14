"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { ScoredPlan, UserInput } from "@/types/plan"

interface ScoreBreakdownProps {
  plan: ScoredPlan
  userInput: UserInput
}

const SCORE_CATEGORIES = [
  {
    key: "targetAlignment" as const,
    label: "Adequação ao Porte",
    description: "Plano adequado para seu tipo de empresa",
    maxScore: 20,
  },
  {
    key: "nfLimitMatch" as const,
    label: "Limite de Notas Fiscais",
    description: "Capacidade de emissão de NF compatível",
    maxScore: 20,
  },
  {
    key: "servicesMatch" as const,
    label: "Serviços Necessários",
    description: "Inclui folha de pagamento e consultoria",
    maxScore: 30,
  },
  {
    key: "priceScore" as const,
    label: "Custo-Benefício",
    description: "Preço competitivo para a categoria",
    maxScore: 20,
  },
  {
    key: "slaScore" as const,
    label: "Qualidade do Suporte",
    description: "Canais e SLA de atendimento",
    maxScore: 10,
  },
  {
    key: "featuresBonus" as const,
    label: "Recursos Extras",
    description: "Funcionalidades adicionais incluídas",
    maxScore: 5,
  },
]

export function ScoreBreakdown({ plan, userInput }: ScoreBreakdownProps) {
  const totalMaxScore = SCORE_CATEGORIES.reduce((sum, cat) => sum + cat.maxScore, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Por que recomendamos o {plan.name}?
          <span className="text-2xl font-bold text-primary">
            {plan.score}/{totalMaxScore}
          </span>
        </CardTitle>
        <CardDescription>
          Veja como calculamos a pontuação baseada no seu perfil de {userInput.tipoEmpresa}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {SCORE_CATEGORIES.map((category) => {
            const score = plan.scoreBreakdown[category.key]
            const percentage = (score / category.maxScore) * 100

            return (
              <div key={category.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{category.label}</h4>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">
                      {score}/{category.maxScore}
                    </span>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Pontuação Total</span>
              <span className="font-bold text-2xl text-primary">
                {plan.score}/{totalMaxScore}
              </span>
            </div>
            <Progress value={(plan.score / totalMaxScore) * 100} className="h-3 mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
