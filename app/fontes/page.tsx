import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Fontes e Metodologia",
  description:
    "Conheça as fontes de dados e metodologia utilizada pelo ContábilCompare para garantir informações precisas e atualizadas sobre planos contábeis.",
  openGraph: {
    title: "Fontes e Metodologia | ContábilCompare",
    description:
      "Transparência total: veja como coletamos e validamos os dados dos planos contábeis para garantir recomendações precisas.",
  },
}

const DATA_SOURCES = [
  {
    provider: "Contabilizei",
    url: "https://contabilizei.com.br/planos-e-precos",
    lastUpdated: "2024-01-15",
    dataPoints: ["Preços", "Limites de NF", "Recursos inclusos", "SLA de suporte"],
  },
  {
    provider: "Qipu Contabilidade",
    url: "https://qipu.com.br/planos",
    lastUpdated: "2024-01-15",
    dataPoints: ["Preços", "Taxa de setup", "Limites de NF", "Serviços inclusos"],
  },
  {
    provider: "Omie Contabilidade",
    url: "https://contabilidade.omie.com.br/planos",
    lastUpdated: "2024-01-15",
    dataPoints: ["Preços", "Recursos", "Integrações", "Público-alvo"],
  },
]

const METHODOLOGY_STEPS = [
  {
    step: 1,
    title: "Coleta de Dados",
    description:
      "Visitamos regularmente os sites oficiais dos provedores para coletar informações atualizadas sobre preços, recursos e condições.",
  },
  {
    step: 2,
    title: "Validação",
    description:
      "Todos os dados passam por validação com schemas TypeScript e Zod para garantir consistência e integridade.",
  },
  {
    step: 3,
    title: "Estruturação",
    description: "As informações são organizadas em formato padronizado para permitir comparações justas e precisas.",
  },
  {
    step: 4,
    title: "Algoritmo de Scoring",
    description:
      "Aplicamos um algoritmo transparente que considera adequação ao porte, limites, serviços e custo-benefício.",
  },
  {
    step: 5,
    title: "Atualização",
    description:
      "Monitoramos mudanças nos sites dos provedores e atualizamos os dados regularmente para manter a precisão.",
  },
]

export default function FontesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Container>
          <div className="py-16 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Fontes e Metodologia</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transparência total: conheça como coletamos, validamos e processamos os dados para oferecer
                recomendações precisas e confiáveis.
              </p>
            </div>

            {/* Data Sources */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Fontes de Dados</h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                Coletamos informações diretamente dos sites oficiais dos provedores de serviços contábeis, garantindo
                dados precisos e atualizados.
              </p>
              <div className="grid gap-6">
                {DATA_SOURCES.map((source) => (
                  <Card key={source.provider}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{source.provider}</CardTitle>
                          <CardDescription className="mt-2">
                            Última atualização: {new Date(source.lastUpdated).toLocaleDateString("pt-BR")}
                          </CardDescription>
                        </div>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:underline"
                          aria-label={`Visitar site oficial do ${source.provider}`}
                        >
                          Visitar fonte
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-medium mb-2">Dados coletados:</h4>
                        <div className="flex flex-wrap gap-2">
                          {source.dataPoints.map((point) => (
                            <Badge key={point} variant="secondary">
                              {point}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Methodology */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Nossa Metodologia</h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                Seguimos um processo rigoroso para garantir que as recomendações sejam baseadas em dados confiáveis e
                critérios objetivos.
              </p>
              <div className="grid gap-6">
                {METHODOLOGY_STEPS.map((item) => (
                  <Card key={item.step}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Scoring Algorithm */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Algoritmo de Pontuação</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Como calculamos as recomendações</CardTitle>
                  <CardDescription>
                    Nosso algoritmo considera múltiplos fatores para encontrar o plano mais adequado ao seu perfil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Critérios de Avaliação:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          <strong>Adequação ao Porte (20 pts):</strong> Compatibilidade com MEI/ME/EPP
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          <strong>Limite de NF (20 pts):</strong> Capacidade de emissão mensal
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          <strong>Serviços Necessários (30 pts):</strong> Folha e consultoria
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          <strong>Custo-Benefício (20 pts):</strong> Preço competitivo
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          <strong>Qualidade do Suporte (10 pts):</strong> SLA e canais
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          <strong>Recursos Extras (5 pts):</strong> Funcionalidades adicionais
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Transparência:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Todos os critérios são objetivos e mensuráveis</li>
                        <li>• O breakdown da pontuação é sempre exibido</li>
                        <li>• Não há favorecimento de provedores específicos</li>
                        <li>• O algoritmo é determinístico e reproduzível</li>
                        <li>• Dados de entrada são validados e auditáveis</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Disclaimer */}
            <section className="bg-muted/50 p-8 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Aviso Importante</h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                As informações apresentadas são baseadas em dados públicos coletados dos sites oficiais dos provedores.
                Preços, condições e recursos podem mudar sem aviso prévio. Recomendamos sempre confirmar as informações
                diretamente com o provedor antes de tomar qualquer decisão de contratação. O ContábilCompare não se
                responsabiliza por eventuais divergências ou mudanças nas condições oferecidas pelos provedores.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
