import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ComparisonInterface } from "@/components/comparison/comparison-interface"

export const metadata: Metadata = {
  title: "Comparar Planos Contábeis | ContábilCompare",
  description:
    "Compare todos os planos contábeis disponíveis lado a lado. Filtre por preço, recursos e encontre a melhor opção para sua empresa.",
  keywords: "comparar planos contábeis, filtros, preços, recursos, MEI, ME, EPP",
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Container>
          <div className="py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Compare Todos os Planos</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Veja todos os planos contábeis disponíveis, filtre por suas necessidades e compare recursos lado a lado
              </p>
            </div>
            <ComparisonInterface />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
