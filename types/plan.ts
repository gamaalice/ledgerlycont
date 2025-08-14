export type CompanyType = "MEI" | "ME" | "EPP"

export type SupportSLA = "email" | "chat" | "phone" | "priority"

export type ProviderCategory = "contabilidade" | "banco_pj" | "nfe" | "certificado_digital"

export interface Plan {
  id: string
  name: string
  price_month: number
  price_setup?: number
  nf_limit_per_month?: number
  payroll_included?: boolean
  advisory_included?: boolean
  support_sla?: SupportSLA
  target: CompanyType[]
  features: string[]
  constraints?: string[]
  notes?: string
}

export interface Provider {
  id: string
  name: string
  category: ProviderCategory
  site_url: string
  logo_url: string
  plans: Plan[]
  last_updated: string
  source_urls: string[]
}

export interface UserInput {
  tipoEmpresa: CompanyType
  faturamentoAnual: number
  nfMes: number
  servicos: {
    folha?: boolean
    consultoria?: boolean
  }
}

export interface ScoredPlan extends Plan {
  provider: Provider
  score: number
  scoreBreakdown: {
    targetAlignment: number
    nfLimitMatch: number
    servicesMatch: number
    priceScore: number
    slaScore: number
    featuresBonus: number
  }
  badges: string[]
}
