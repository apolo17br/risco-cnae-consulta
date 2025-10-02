import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { RiskLevel } from "@/lib/supabase";

interface CNAEFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  riskFilter: RiskLevel | "Todos";
  onRiskFilterChange: (value: RiskLevel | "Todos") => void;
  sortBy: "codigo" | "descricao";
  onSortChange: (value: "codigo" | "descricao") => void;
}

export function CNAEFilters({
  searchTerm,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  sortBy,
  onSortChange,
}: CNAEFiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Buscar por código ou descrição
        </Label>
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={18}
          aria-hidden="true"
        />
        <Input
          id="search"
          type="search"
          placeholder="Buscar por código CNAE ou descrição..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          aria-label="Campo de busca por código ou descrição da atividade"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="risk-filter" className="mb-2 block text-sm font-medium">
            Filtrar por nível de risco
          </Label>
          <Select
            value={riskFilter}
            onValueChange={(value) => onRiskFilterChange(value as RiskLevel | "Todos")}
          >
            <SelectTrigger id="risk-filter" aria-label="Filtro de nível de risco">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos os níveis</SelectItem>
              <SelectItem value="Baixo">Baixo</SelectItem>
              <SelectItem value="Médio">Médio</SelectItem>
              <SelectItem value="Alto">Alto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sort-by" className="mb-2 block text-sm font-medium">
            Ordenar por
          </Label>
          <Select
            value={sortBy}
            onValueChange={(value) => onSortChange(value as "codigo" | "descricao")}
          >
            <SelectTrigger id="sort-by" aria-label="Ordenação">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="codigo">Código CNAE</SelectItem>
              <SelectItem value="descricao">Descrição</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
