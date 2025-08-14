"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RecommendationCard } from "@/components/results/recommendation-card"
import { ScoreBreakdown } from "@/components/results/score-breakdown"
import { SaveResults } from "@/components/results/save-results"
import { ComparisonTable } from "@/components/results/comparison-table"
import type { UserInput, ScoredPlan } from "@/types/plan"
import Link from "next/link"

export default function ResultsPage() {
  const [userInput, setUserInput] = useState<UserInput | null>(null)
  const [recommendations, setRecommendations] = useState<ScoredPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    const loadResults = async () => {
      try {
        // Get user input from localStorage
        const storedData = localStorage.getItem("questionnaire-data")
        if (!storedData) {
          setError("Dados do questionário não encontrados. Por favor, refaça o questionário.")
          setLoading(false)
          return
        }

        const input: UserInput = JSON.parse(storedData)
        setUserInput(input)

        // Call comparison API
        const response = await fetch("/api/compare", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error("Erro ao processar recomendações")
        }

        const result = await response.json()

        if (result.success) {
          setRecommendations(result.data.recommendations)
        } else {
          throw new Error(result.error || "Erro desconhecido")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar resultados")
      } finally {
        setLoading(false)
      }
    }

    loadResults()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Container>
            <div className="py-16 space-y-8">
              <div className="text-center space-y-4">
                <Skeleton className="h-12 w-96 mx-auto" />
                <Skeleton className="h-6 w-64 mx-auto" />
              </div>
              <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !userInput) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Container>
            <div className="py-16 text-center">
              <Alert className="max-w-md mx-auto">
                <AlertDescription>{error || "Dados não encontrados"}</AlertDescription>
              </Alert>
              <Link href="/" className="inline-block mt-6">
                <Button>Refazer Questionário</Button>
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    )
  }

  const topRecommendation = recommendations[0]
  const otherRecommendations = recommendations.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-16 space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-4">
                Recomendações Personalizadas
              </Badge>
              <h1 className="text-4xl font-bold">Seus Planos Recomendados</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Baseado no seu perfil de <span className="font-semibold text-primary">{userInput.tipoEmpresa}</span> com{" "}
                <span className="font-semibold text-primary">{userInput.nfMes} NF/mês</span>
              </p>
            </div>

            {/* Top Recommendation */}
            {topRecommendation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-4 py-1">Melhor Recomendação</Badge>
                  </div>
                  <RecommendationCard plan={topRecommendation} isTopRecommendation={true} userInput={userInput} />
                </div>
              </motion.div>
            )}

            {/* Score Breakdown */}
            {topRecommendation && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <ScoreBreakdown plan={topRecommendation} userInput={userInput} />
              </motion.div>
            )}

            {/* Other Recommendations */}
            {otherRecommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-center">Outras Opções</h2>
                <div className="grid gap-6">
                  {otherRecommendations.map((plan, index) => (
                    <RecommendationCard
                      key={`${plan.provider.id}-${plan.id}`}
                      plan={plan}
                      isTopRecommendation={false}
                      userInput={userInput}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={() => setShowComparison(!showComparison)}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {showComparison ? "Ocultar" : "Ver"} Comparação Detalhada
              </Button>
              <SaveResults recommendations={recommendations} userInput={userInput} />
              <Link href="/">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Nova Consulta
                </Button>
              </Link>
            </motion.div>

            {/* Comparison Table */}
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ComparisonTable plans={recommendations} />
              </motion.div>
            )}

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-muted/50 p-6 rounded-lg text-center"
            >
              <p className="text-sm text-muted-foreground">
                <strong>Aviso:</strong> Os preços e condições são baseados em informações públicas coletadas em{" "}
                {new Date().toLocaleDateString("pt-BR")}. Confirme sempre as condições atuais no site do provedor antes
                de contratar.
              </p>
              <Link href="/fontes" className="text-primary hover:underline text-sm">
                Ver fontes e metodologia
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
