import type { Metadata } from "next"
import { QuestionnaireWizard } from "@/components/questionnaire/questionnaire-wizard"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Ledgerly - Compare Serviços de Contabilidade",
  description: "Compare planos contábeis para MEI, ME e EPP. Encontre o serviço ideal para sua empresa.",
  keywords: "contabilidade, MEI, ME, EPP, planos contábeis, comparador",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/40 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-slate-900">Encontre o </span>
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                plano contábil
              </span>
              <span className="text-slate-900"> ideal</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Compare serviços reais de contabilidade em poucos minutos. Recomendações personalizadas baseadas no seu
              perfil empresarial.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm mb-16">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-slate-700 font-medium">Dados atualizados</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-slate-700 font-medium">100% gratuito</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                <span className="text-slate-700 font-medium">Sem cadastro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="relative -mt-8">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl transform rotate-1" />

          <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2 rounded-full mb-6">
                  <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                    Questionário Inteligente
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                    Vamos começar?
                  </span>
                </h2>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Responda 4 perguntas rápidas sobre sua empresa e descubra os melhores planos contábeis para seu perfil
                </p>
              </div>

              <QuestionnaireWizard />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
