import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "./RiskBadge";
import { GroupedCNAE } from "@/lib/supabase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { getRiskToneConfig } from "@/lib/riskTheme";

interface CNAECardsMobileProps {
  groups: GroupedCNAE[];
  highlightByRisk: boolean;
}

export function CNAECardsMobile({ groups, highlightByRisk }: CNAECardsMobileProps) {
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

        return (
          <Card key={group.codigo} className="transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base font-mono">
                  {group.codigo}
                </CardTitle>
                <Badge variant="secondary">
                  {group.variations.length} variações
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {group.variations.map((variation, index) => {
                  const tone = getRiskToneConfig(variation.nivel_risco);
                  const highlightClass = highlightByRisk ? tone.surfaceClassName : "";

                  return (
                    <AccordionItem
                      key={variation.id}
                      value={variation.id}
                      className={cn(
                        "border-b-0",
                        highlightByRisk && "rounded-md mb-2 last:mb-0",
                        highlightClass
                      )}
                    >
                      <AccordionTrigger
                        className={cn(
                          "text-sm hover:no-underline py-3 px-3 text-left",
                          highlightByRisk && "rounded-t-md"
                        )}
                      >
                        <div className="flex items-center gap-2 text-left">
                          <span className="text-muted-foreground">
                            Variação {index + 1}
                          </span>
                          <RiskBadge level={variation.nivel_risco} className="text-xs" />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent
                        className={cn(
                          "text-sm pb-3 px-3",
                          highlightByRisk && "text-foreground",
                          highlightByRisk && "rounded-b-md"
                        )}
                      >
                        {variation.descricao}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
