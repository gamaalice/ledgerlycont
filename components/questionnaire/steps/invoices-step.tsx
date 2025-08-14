"use client"

import type { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import type { UserInput } from "@/lib/schemas"

interface InvoicesStepProps {
  form: UseFormReturn<UserInput>
}

const INVOICE_RANGES = [
  {
    value: 10,
    label: "Até 10 notas/mês",
    description: "Baixo volume, operação simples",
    icon: "📄",
  },
  {
    value: 50,
    label: "11 a 50 notas/mês",
    description: "Volume moderado, controle necessário",
    icon: "📋",
  },
  {
    value: 100,
    label: "51 a 100 notas/mês",
    description: "Alto volume, automação importante",
    icon: "📊",
  },
  {
    value: 200,
    label: "101 a 200 notas/mês",
    description: "Volume intenso, integração essencial",
    icon: "🏢",
  },
  {
    value: 500,
    label: "201 a 500 notas/mês",
    description: "Operação robusta, suporte premium",
    icon: "🏭",
  },
  {
    value: 1000,
    label: "Mais de 500 notas/mês",
    description: "Empresa consolidada, sem limites",
    icon: "🚀",
  },
]

export function InvoicesStep({ form }: InvoicesStepProps) {
  const { watch, setValue } = form
  const selectedInvoices = watch("nfMes")

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedInvoices?.toString()}
        onValueChange={(value) => setValue("nfMes", Number.parseInt(value))}
        className="space-y-3"
      >
        {INVOICE_RANGES.map((range) => (
          <div key={range.value} className="relative">
            <RadioGroupItem value={range.value.toString()} id={range.value.toString()} className="peer sr-only" />
            <Label htmlFor={range.value.toString()} className="cursor-pointer block">
              <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground peer-checked:border-primary peer-checked:bg-primary flex-shrink-0" />
                    <div className="text-2xl mr-2">{range.icon}</div>
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

      <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="flex items-start space-x-2">
          <svg
            className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Atenção aos limites</p>
            <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
              Muitos planos têm limite de notas fiscais. Exceder pode gerar custos extras. Considere picos sazonais na
              sua estimativa.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
