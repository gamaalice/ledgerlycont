import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sobre o ContábilCompare",
  description:
    "Conheça a missão do ContábilCompare: ajudar empreendedores brasileiros a encontrar os melhores serviços contábeis com transparência e dados reais.",
  openGraph: {
    title: "Sobre o ContábilCompare",
    description:
      "Nossa missão é democratizar o acesso à informação sobre serviços contábeis, ajudando empreendedores a tomar decisões mais informadas.",
  },
}

const FEATURES = [
  {
    title: "Dados Reais",
    description: "Informações coletadas diretamente dos sites oficiais dos provedores",
    icon: "📊",
  },
  {
    title: "Transparência Total",
    description: "Metodologia aberta, fontes públicas e critérios objetivos",
    icon: "🔍",
  },
  {
    title: "Recomendação Inteligente",
    description: "Algoritmo que considera seu perfil específico de empresa",
    icon: "🎯",
  },
  {
    title: "Sempre Atualizado",
    description: "Monitoramento contínuo para manter informações precisas",
    icon: "🔄",
  },
  {
    title: "Gratuito e Acessível",
    description: "Sem cadastro, sem custos, focado na experiência do usuário",
    icon: "🆓",
  },
  {
    title: "Para Todos os Portes",
    description: "Soluções específicas para MEI, ME e EPP",
    icon: "🏢",
  },
]

const STATS = [
  { label: "Provedores Analisados", value: "3+", description: "E crescendo constantemente" },
  { label: "Planos Comparados", value: "9+", description: "Diferentes opções disponíveis" },
  { label: "Critérios de Avaliação", value: "6", description: "Fatores objetivos considerados" },
  { label: "Atualizações", value: "Mensais", description: "Dados sempre frescos" },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Container>
          <div className="py-16 space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Sobre o ContábilCompare</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Nossa missão é <strong>democratizar o acesso à informação</strong> sobre serviços contábeis, ajudando
                empreendedores brasileiros a tomar decisões mais informadas e encontrar as melhores soluções para seus
                negócios.
              </p>
            </section>

            {/* Problem & Solution */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">O Problema que Resolvemos</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Escolher um serviço contábil é uma das decisões mais importantes para qualquer empreendedor, mas o
                    processo é frequentemente confuso e opaco.
                  </p>
                  <p>
                    Muitos empresários acabam pagando mais do que deveriam ou contratando serviços inadequados ao seu
                    porte, simplesmente por falta de informação clara e comparável.
                  </p>
                  <p>
                    Sites de provedores usam linguagem técnica, escondem limitações e dificultam comparações diretas
                    entre opções.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Nossa Solução</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    O ContábilCompare centraliza informações de múltiplos provedores em um formato padronizado e
                    comparável.
                  </p>
                  <p>
                    Nosso algoritmo inteligente considera seu perfil específico (porte, faturamento, necessidades) para
                    recomendar as melhores opções.
                  </p>
                  <p>
                    Tudo com transparência total: você vê exatamente como chegamos às recomendações e pode verificar
                    nossas fontes.
                  </p>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-center">Por que Confiar no ContábilCompare?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((feature) => (
                  <Card key={feature.title} className="text-center">
                    <CardHeader>
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Stats */}
            <section className="bg-muted/50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-center mb-8">Nossos Números</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="font-medium mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Values */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-center">Nossos Valores</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Transparência</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Todas as nossas fontes são públicas, nossa metodologia é aberta e nossos critérios são objetivos.
                      Você sempre sabe como chegamos às nossas recomendações.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Independência</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Não recebemos comissões ou pagamentos de provedores. Nossas recomendações são baseadas
                      exclusivamente em dados objetivos e adequação ao seu perfil.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Acessibilidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Informação de qualidade deve ser gratuita e acessível. Nossa plataforma é otimizada para todos os
                      dispositivos e níveis de conhecimento técnico.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Future */}
            <section className="text-center space-y-6">
              <h2 className="text-3xl font-bold">O Futuro do ContábilCompare</h2>
              <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
                <p>
                  Estamos constantemente expandindo nossa base de dados, incluindo novos provedores e categorias de
                  serviços.
                </p>
                <p>
                  Em breve, adicionaremos comparações de bancos PJ, emissores de NFe, certificados digitais e outros
                  serviços essenciais para empreendedores.
                </p>
                <p>
                  Nosso objetivo é ser a referência definitiva para decisões empresariais relacionadas a serviços
                  financeiros e contábeis no Brasil.
                </p>
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
