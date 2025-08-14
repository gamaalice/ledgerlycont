"use client"

import type { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserInput } from "@/lib/schemas"

interface ServicesStepProps {
  form: UseFormReturn<UserInput>
}

const SERVICES = [
  {
    key: "folha" as const,
    title: "Folha de Pagamento",
    description: "Gestão completa de funcionários, cálculos trabalhistas e eSocial",
    benefits: [
      "Cálculo automático de salários",
      "Gestão de férias e 13º",
      "eSocial e obrigações trabalhistas",
      "Relatórios de RH",
    ],
    price: "Geralmente R$ 15-30/funcionário",
    icon: "👥",
  },
  {
    key: "consultoria" as const,
    title: "Consultoria Contábil",
    description: "Orientação especializada para decisões estratégicas e compliance",
    benefits: [
      "Planejamento tributário",
      "Orientação sobre investimentos",
      "Análise de viabilidade",
      "Suporte em auditorias",
    ],
    price: "Incluso ou R$ 200-500/mês",
    icon: "💡",
  },
]

export function ServicesStep({ form }: ServicesStepProps) {
  const { watch, setValue } = form
  const services = watch("servicos")

  const handleServiceChange = (serviceKey: "folha" | "consultoria", checked: boolean) => {
    setValue(`servicos.${serviceKey}`, checked)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          Selecione os serviços extras que sua empresa precisa. Isso nos ajuda a recomendar planos mais completos.
        </p>
      </div>

      <div className="space-y-4">
        {SERVICES.map((service) => (
          <Card key={service.key} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={service.key}
                  checked={services[service.key] || false}
                  onCheckedChange={(checked) => handleServiceChange(service.key, checked as boolean)}
                />
                <div className="text-2xl">{service.icon}</div>
                <div className="flex-1">
                  <Label htmlFor={service.key} className="cursor-pointer">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </Label>
                  <CardDescription className="mt-1">{service.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Inclui:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-3 h-3 text-accent mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Custo típico:</h4>
                  <p className="text-sm text-muted-foreground">{service.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-start space-x-2">
          <svg
            className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-green-900 dark:text-green-100">Dica de economia</p>
            <p className="text-sm text-green-700 dark:text-green-200 mt-1">
              Muitas vezes é mais econômico contratar um plano que já inclui esses serviços do que pagar separadamente.
              Vamos mostrar as melhores opções!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
