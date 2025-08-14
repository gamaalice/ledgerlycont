"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import type { ScoredPlan, UserInput } from "@/types/plan"
import { Download, Save } from "lucide-react"

interface SaveResultsProps {
  recommendations: ScoredPlan[]
  userInput: UserInput
}

export function SaveResults({ recommendations, userInput }: SaveResultsProps) {
  const [saving, setSaving] = useState(false)

  const handleSaveLocal = () => {
    try {
      const resultsData = {
        userInput,
        recommendations,
        savedAt: new Date().toISOString(),
      }

      localStorage.setItem("saved-results", JSON.stringify(resultsData))
      toast({
        title: "Resultados salvos!",
        description: "Seus resultados foram salvos localmente no navegador.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar os resultados.",
        variant: "destructive",
      })
    }
  }

  const handleExportPDF = async () => {
    setSaving(true)
    try {
      // Create a simple text export (in a real app, you'd use a PDF library)
      const content = generateTextReport(recommendations, userInput)
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `recomendacoes-contabeis-${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Relatório exportado!",
        description: "Seu relatório foi baixado com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar o relatório.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button onClick={handleSaveLocal} variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
        <Save className="w-4 h-4 mr-2" />
        Salvar Resultados
      </Button>
      <Button
        onClick={handleExportPDF}
        disabled={saving}
        variant="outline"
        size="lg"
        className="w-full sm:w-auto bg-transparent"
      >
        <Download className="w-4 h-4 mr-2" />
        {saving ? "Exportando..." : "Exportar Relatório"}
      </Button>
    </div>
  )
}

function generateTextReport(recommendations: ScoredPlan[], userInput: UserInput): string {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  let report = `RELATÓRIO DE RECOMENDAÇÕES CONTÁBEIS
Gerado em: ${new Date().toLocaleString("pt-BR")}

PERFIL DA EMPRESA:
- Tipo: ${userInput.tipoEmpresa}
- Faturamento anual: ${formatPrice(userInput.faturamentoAnual)}
- Notas fiscais/mês: ${userInput.nfMes}
- Folha de pagamento: ${userInput.servicos.folha ? "Sim" : "Não"}
- Consultoria: ${userInput.servicos.consultoria ? "Sim" : "Não"}

RECOMENDAÇÕES:

`

  recommendations.forEach((plan, index) => {
    report += `${index + 1}. ${plan.name} - ${plan.provider.name}
   Preço: ${formatPrice(plan.price_month)}/mês
   Pontuação: ${plan.score}/105 pontos
   Badges: ${plan.badges.join(", ")}
   
   Recursos principais:
   ${plan.features.map((f) => `   • ${f}`).join("\n")}
   
   Site: ${plan.provider.site_url}
   
`
  })

  report += `
AVISO LEGAL:
Os preços e condições são baseados em informações públicas e podem ter mudado.
Confirme sempre as condições atuais no site do provedor antes de contratar.
`

  return report
}
