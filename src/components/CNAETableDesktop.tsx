import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "./RiskBadge";
import { GroupedCNAE } from "@/lib/supabase";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { getRiskToneConfig } from "@/lib/riskTheme";

interface CNAETableDesktopProps {
  groups: GroupedCNAE[];
  highlightByRisk: boolean;
}

export function CNAETableDesktop({ groups, highlightByRisk }: CNAETableDesktopProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (codigo: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(codigo)) {
        next.delete(codigo);
      } else {
        next.add(codigo);
      }
      return next;
    });
  };

  return (
    <div className="hidden md:block rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Código CNAE</TableHead>
            <TableHead>Descrição da Atividade</TableHead>
            <TableHead className="w-[140px]">Nível de Risco</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => {
            const hasMultiple = group.variations.length > 1;
            const isExpanded = expandedRows.has(group.codigo);

            if (!hasMultiple) {
              const variation = group.variations[0];
              const tone = getRiskToneConfig(variation.nivel_risco);

              return (
                <TableRow
                  key={variation.id}
                  className={cn(
                    "transition-colors",
                    highlightByRisk && tone.rowClassName
                  )}
                >
                  <TableCell className="font-mono font-medium">
                    {group.codigo}
                  </TableCell>
                  <TableCell>{variation.descricao}</TableCell>
                  <TableCell>
                    <RiskBadge level={variation.nivel_risco} />
                  </TableCell>
                </TableRow>
              );
            }

            return (
              <Collapsible
                key={group.codigo}
                open={isExpanded}
                onOpenChange={() => toggleRow(group.codigo)}
                asChild
              >
                <>
                  <TableRow className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start font-mono font-medium p-0 h-auto hover:bg-transparent"
                          aria-label={`${isExpanded ? "Recolher" : "Expandir"} variações do código ${group.codigo}`}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 mr-2" />
                          ) : (
                            <ChevronRight className="w-4 h-4 mr-2" />
                          )}
                          {group.codigo}
                          <Badge variant="secondary" className="ml-2">
                            {group.variations.length} variações
                          </Badge>
                        </Button>
                      </CollapsibleTrigger>
                    </TableCell>
                    <TableCell colSpan={2} className="text-muted-foreground text-sm">
                      Clique para ver todas as variações desta atividade
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <>
                      {group.variations.map((variation, index) => (
                        <TableRow
                          key={variation.id}
                          className={cn(
                            "transition-colors",
                            highlightByRisk
                              ? getRiskToneConfig(variation.nivel_risco).rowClassName
                              : "bg-muted/30"
                          )}
                        >
                          <TableCell className="pl-12 text-muted-foreground text-sm">
                            Variação {index + 1}
                          </TableCell>
                          <TableCell>{variation.descricao}</TableCell>
                          <TableCell>
                            <RiskBadge level={variation.nivel_risco} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  </CollapsibleContent>
                </>
              </Collapsible>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
