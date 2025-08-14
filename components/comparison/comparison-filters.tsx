"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FilterState {
  priceRange: [number, number]
  companyTypes: string[]
  features: string[]
  nfLimit: number | null
  includePayroll: boolean | null
  includeAdvisory: boolean | null
}

interface ComparisonFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const COMPANY_TYPES = [
  { value: "MEI", label: "MEI" },
  { value: "ME", label: "Microempresa" },
  { value: "EPP", label: "Empresa de Pequeno Porte" },
]

const NF_LIMITS = [
  { value: null, label: "Qualquer limite" },
  { value: 50, label: "Pelo menos 50/mês" },
  { value: 100, label: "Pelo menos 100/mês" },
  { value: 200, label: "Pelo menos 200/mês" },
  { value: 500, label: "Pelo menos 500/mês" },
]

export function ComparisonFilters({ filters, onFiltersChange }: ComparisonFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleCompanyType = (type: string) => {
    const newTypes = filters.companyTypes.includes(type)
      ? filters.companyTypes.filter((t) => t !== type)
      : [...filters.companyTypes, type]
    updateFilter("companyTypes", newTypes)
  }

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 500],
      companyTypes: [],
      features: [],
      nfLimit: null,
      includePayroll: null,
      includeAdvisory: null,
    })
  }

  const hasActiveFilters =
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500 ||
    filters.companyTypes.length > 0 ||
    filters.nfLimit !== null ||
    filters.includePayroll !== null ||
    filters.includeAdvisory !== null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filtros</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Faixa de Preço</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>R$ {filters.priceRange[0]}</span>
              <span>R$ {filters.priceRange[1]}+</span>
            </div>
          </div>
        </div>

        {/* Company Types */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Tipo de Empresa</Label>
          <div className="flex flex-wrap gap-2">
            {COMPANY_TYPES.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={type.value}
                  checked={filters.companyTypes.includes(type.value)}
                  onCheckedChange={() => toggleCompanyType(type.value)}
                />
                <Label htmlFor={type.value} className="cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* NF Limit */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Limite de Notas Fiscais</Label>
          <Select
            value={filters.nfLimit?.toString() || "null"}
            onValueChange={(value) => updateFilter("nfLimit", value === "null" ? null : Number.parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o limite mínimo" />
            </SelectTrigger>
            <SelectContent>
              {NF_LIMITS.map((limit) => (
                <SelectItem key={limit.value?.toString() || "null"} value={limit.value?.toString() || "null"}>
                  {limit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Services */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Serviços Inclusos</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="payroll" className="cursor-pointer">
                Folha de Pagamento
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={filters.includePayroll === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("includePayroll", filters.includePayroll === true ? null : true)}
                >
                  Sim
                </Button>
                <Button
                  variant={filters.includePayroll === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("includePayroll", filters.includePayroll === false ? null : false)}
                >
                  Não
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="advisory" className="cursor-pointer">
                Consultoria Contábil
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={filters.includeAdvisory === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("includeAdvisory", filters.includeAdvisory === true ? null : true)}
                >
                  Sim
                </Button>
                <Button
                  variant={filters.includeAdvisory === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("includeAdvisory", filters.includeAdvisory === false ? null : false)}
                >
                  Não
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <Label className="text-base font-medium">Filtros Ativos</Label>
            <div className="flex flex-wrap gap-2">
              {filters.priceRange[0] > 0 && <Badge variant="secondary">Preço mín: R$ {filters.priceRange[0]}</Badge>}
              {filters.priceRange[1] < 500 && <Badge variant="secondary">Preço máx: R$ {filters.priceRange[1]}</Badge>}
              {filters.companyTypes.map((type) => (
                <Badge key={type} variant="secondary">
                  {type}
                </Badge>
              ))}
              {filters.nfLimit && <Badge variant="secondary">NF: {filters.nfLimit}+/mês</Badge>}
              {filters.includePayroll === true && <Badge variant="secondary">Com folha</Badge>}
              {filters.includePayroll === false && <Badge variant="secondary">Sem folha</Badge>}
              {filters.includeAdvisory === true && <Badge variant="secondary">Com consultoria</Badge>}
              {filters.includeAdvisory === false && <Badge variant="secondary">Sem consultoria</Badge>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
