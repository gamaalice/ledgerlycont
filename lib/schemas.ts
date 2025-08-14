import { z } from "zod"

export const CompanyTypeSchema = z.enum(["MEI", "ME", "EPP"])

export const SupportSLASchema = z.enum(["email", "chat", "phone", "priority"])

export const ProviderCategorySchema = z.enum(["contabilidade", "banco_pj", "nfe", "certificado_digital"])

export const PlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price_month: z.number().positive(),
  price_setup: z.number().positive().optional(),
  nf_limit_per_month: z.number().positive().optional(),
  payroll_included: z.boolean().optional(),
  advisory_included: z.boolean().optional(),
  support_sla: SupportSLASchema.optional(),
  target: z.array(CompanyTypeSchema),
  features: z.array(z.string()),
  constraints: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

export const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: ProviderCategorySchema,
  site_url: z.string().url(),
  logo_url: z.string().url(),
  plans: z.array(PlanSchema),
  last_updated: z.string().datetime(),
  source_urls: z.array(z.string().url()),
})

export const UserInputSchema = z.object({
  tipoEmpresa: CompanyTypeSchema,
  faturamentoAnual: z.number().positive(),
  nfMes: z.number().nonnegative(),
  servicos: z.object({
    folha: z.boolean().optional(),
    consultoria: z.boolean().optional(),
  }),
})

export type Provider = z.infer<typeof ProviderSchema>
export type UserInput = z.infer<typeof UserInputSchema>
export type Plan = z.infer<typeof PlanSchema>
export type CompanyType = z.infer<typeof CompanyTypeSchema>
export type SupportSLA = z.infer<typeof SupportSLASchema>
export type ProviderCategory = z.infer<typeof ProviderCategorySchema>
