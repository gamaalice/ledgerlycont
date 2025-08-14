"use client"

import type { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import type { UserInput } from "@/lib/schemas"

interface CompanyTypeStepProps {
  form: UseFormReturn<UserInput>
}

const COMPANY_TYPES = [
  {
    value: "MEI" as const,
    title: "MEI - Microempreendedor Individual",
    description: "Faturamento até R$ 81.000/ano",
    features: ["Até R$ 6.750/mês", "Sem funcionários", "Atividades permitidas limitadas"],
  },
  {
    value: "ME" as const,
    title: "ME - Microempresa",
    description: "Faturamento até R$ 360.000/ano",
    features: ["Até R$ 30.000/mês", "Até 9 funcionários", "Maior flexibilidade"],
  },
  {
    value: "EPP" as const,
    title: "EPP - Empresa de Pequeno Porte",
    description: "Faturamento até R$ 4.800.000/ano",
    features: ["Até R$ 400.000/mês", "Até 49 funcionários", "Todas as atividades"],
  },
]

export function CompanyTypeStep({ form }: CompanyTypeStepProps) {
  const { register, watch, setValue } = form
  const selectedType = watch("tipoEmpresa")

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedType}
        onValueChange={(value) => setValue("tipoEmpresa", value as "MEI" | "ME" | "EPP")}
        className="space-y-3"
      >
        {COMPANY_TYPES.map((type) => (
          <div key={type.value} className="relative">
            <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" {...register("tipoEmpresa")} />
            <Label htmlFor={type.value} className="cursor-pointer block">
              <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground peer-checked:border-primary peer-checked:bg-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{type.title}</h3>
                      <p className="text-muted-foreground mb-2">{type.description}</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {type.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-3 h-3 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Dica:</strong> Não tem certeza? Escolha baseado no seu faturamento atual. Você pode migrar entre
          categorias conforme sua empresa cresce.
        </p>
      </div>
    </div>
  )
}
