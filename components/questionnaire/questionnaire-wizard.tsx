"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { UserInputSchema, type UserInput } from "@/lib/schemas"
import { CompanyTypeStep } from "./steps/company-type-step"
import { RevenueStep } from "./steps/revenue-step"
import { InvoicesStep } from "./steps/invoices-step"
import { ServicesStep } from "./steps/services-step"
import { useRouter } from "next/navigation"
import { Clock, Database, Zap } from "lucide-react"

const STEPS = [
  {
    id: 1,
    title: "Tipo de Empresa",
    description: "Qual é o seu enquadramento atual?",
  },
  {
    id: 2,
    title: "Faturamento Anual",
    description: "Qual o faturamento anual da sua empresa?",
  },
  {
    id: 3,
    title: "Notas Fiscais",
    description: "Quantas notas fiscais você emite por mês?",
  },
  {
    id: 4,
    title: "Serviços Extras",
    description: "Quais serviços adicionais você precisa?",
  },
]

export function QuestionnaireWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<UserInput>({
    resolver: zodResolver(UserInputSchema),
    defaultValues: {
      tipoEmpresa: "MEI",
      faturamentoAnual: 0,
      nfMes: 0,
      servicos: {
        folha: false,
        consultoria: false,
      },
    },
  })

  const { handleSubmit, trigger, formState } = form

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await trigger(fieldsToValidate)

    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStart = () => {
    setCurrentStep(1)
  }

  const onSubmit = async (data: UserInput) => {
    setIsSubmitting(true)
    try {
      // Store data in localStorage for results page
      localStorage.setItem("questionnaire-data", JSON.stringify(data))
      localStorage.setItem("questionnaire-timestamp", new Date().toISOString())

      // Navigate to results page
      router.push("/resultados")
    } catch (error) {
      console.error("Error submitting questionnaire:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldsForStep = (step: number): (keyof UserInput)[] => {
    switch (step) {
      case 1:
        return ["tipoEmpresa"]
      case 2:
        return ["faturamentoAnual"]
      case 3:
        return ["nfMes"]
      case 4:
        return ["servicos"]
      default:
        return []
    }
  }

  const progress = currentStep === 0 ? 0 : (currentStep / STEPS.length) * 100

  if (currentStep === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Encontre seu Plano Ideal</CardTitle>
            <CardDescription className="text-lg mt-4">
              Responda 4 perguntas rápidas e receba recomendações personalizadas baseadas no perfil da sua empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border border-blue-200/50 dark:border-blue-800/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">2 minutos</span>
              </div>

              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border border-green-200/50 dark:border-green-800/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Dados reais</span>
              </div>

              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border border-purple-200/50 dark:border-purple-800/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Recomendação IA</span>
              </div>
            </div>

            <Button
              onClick={handleStart}
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 shadow-lg shadow-violet-500/25"
            >
              Começar Comparação
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const currentStepData = STEPS[currentStep - 1]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary">
              Etapa {currentStep} de {STEPS.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setCurrentStep(0)} className="text-muted-foreground">
              Recomeçar
            </Button>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
          <CardDescription className="text-base">{currentStepData.description}</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && <CompanyTypeStep form={form} />}
                {currentStep === 2 && <RevenueStep form={form} />}
                {currentStep === 3 && <InvoicesStep form={form} />}
                {currentStep === 4 && <ServicesStep form={form} />}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Anterior
              </Button>

              {currentStep < STEPS.length ? (
                <Button type="button" onClick={handleNext}>
                  Próximo
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90">
                  {isSubmitting ? "Processando..." : "Ver Recomendações"}
                </Button>
              )}
            </div>
          </CardContent>
        </form>
      </Card>
    </motion.div>
  )
}
