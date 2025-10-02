import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "./RiskBadge";
import { GroupedCNAE } from "@/lib/supabase";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRiskToneConfig } from "@/lib/riskTheme";

interface CNAECardsMobileProps {
  groups: GroupedCNAE[];
  highlightByRisk: boolean;
}

export function CNAECardsMobile({ groups, highlightByRisk }: CNAECardsMobileProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (codigo: string) => {
    setExpandedGroups((prev) => {
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
    <div className="md:hidden space-y-4">
      {groups.map((group) => {
        const hasMultiple = group.variations.length > 1;

        if (!hasMultiple) {
          const variation = group.variations[0];
          const tone = getRiskToneConfig(variation.nivel_risco);
          return (
            <Card
              key={variation.id}
              className={cn(
                "transition-colors",
                highlightByRisk && tone.surfaceClassName
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-mono">
                    {group.codigo}
                  </CardTitle>
                  <RiskBadge level={variation.nivel_risco} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-card-foreground">
                  {variation.descricao}
                </p>
              </CardContent>
            </Card>
          );
        }

        const isExpanded = expandedGroups.has(group.codigo);

        return (
          <Collapsible
            key={group.codigo}
            open={isExpanded}
            onOpenChange={() => toggleGroup(group.codigo)}
          >
            <Card className="transition-colors">
              <CardHeader className="pb-3">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-2 text-left"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? "Recolher" : "Expandir"} variações do código ${group.codigo}`}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <CardTitle className="text-base font-mono">{group.codigo}</CardTitle>
                      <Badge variant="secondary">{group.variations.length} variações</Badge>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent asChild>
                <CardContent className="space-y-3 pt-0">
                  {group.variations.map((variation, index) => {
                    const tone = getRiskToneConfig(variation.nivel_risco);
                    return (
                      <div
                        key={variation.id}
                        className={cn(
                          "rounded-md border border-border/60 p-3 transition-colors",
                          highlightByRisk && tone.surfaceClassName
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            Variação {index + 1}
                          </span>
                          <RiskBadge level={variation.nivel_risco} className="text-xs" />
                        </div>
                        <p className="mt-2 text-sm text-foreground">{variation.descricao}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}
