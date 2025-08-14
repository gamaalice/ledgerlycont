"use client"

import type { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import type { UserInput } from "@/lib/schemas"

interface RevenueStepProps {
  form: UseFormReturn<UserInput>
}

const REVENUE_RANGES = [
  {
    value: 30000,
    label: "Até R$ 30.000/ano",
    description: "Faturamento baixo, foco em economia",
  },
  {
    value: 81000,
    label: "R$ 30.001 a R$ 81.000/ano",
    description: "Limite MEI, transição comum",
  },
  {
    value: 180000,
    label: "R$ 81.001 a R$ 180.000/ano",
    description: "ME estabelecida, crescimento moderado",
  },
  {
    value: 360000,
    label: "R$ 180.001 a R$ 360.000/ano",
    description: "ME consolidada, limite da categoria",
  },
  {
    value: 1000000,
    label: "R$ 360.001 a R$ 1.000.000/ano",
    description: "EPP inicial, necessidades complexas",
  },
  {
    value: 4800000,
    label: "Acima de R$ 1.000.000/ano",
    description: "EPP estabelecida, serviços premium",
  },
]

export function RevenueStep({ form }: RevenueStepProps) {
  const { watch, setValue } = form
  const selectedRevenue = watch("faturamentoAnual")

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedRevenue?.toString()}
        onValueChange={(value) => setValue("faturamentoAnual", Number.parseInt(value))}
        className="space-y-3"
      >
        {REVENUE_RANGES.map((range) => (
          <div key={range.value} className="relative">
            <RadioGroupItem value={range.value.toString()} id={range.value.toString()} className="peer sr-only" />
            <Label htmlFor={range.value.toString()} className="cursor-pointer block">
              <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground peer-checked:border-primary peer-checked:bg-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium">{range.label}</h3>
                      <p className="text-sm text-muted-foreground">{range.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-2">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Informação importante</p>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
              O faturamento anual é usado para recomendar planos adequados ao seu porte. Considere uma projeção realista
              para os próximos 12 meses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
