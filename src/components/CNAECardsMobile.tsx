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

interface CNAECardsMobileProps {
  groups: GroupedCNAE[];
}

export function CNAECardsMobile({ groups }: CNAECardsMobileProps) {
  return (
    <div className="md:hidden space-y-4">
      {groups.map((group) => {
        const hasMultiple = group.variations.length > 1;

        if (!hasMultiple) {
          const variation = group.variations[0];
          return (
            <Card key={variation.id}>
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
          <Card key={group.codigo}>
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
                {group.variations.map((variation, index) => (
                  <AccordionItem
                    key={variation.id}
                    value={variation.id}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                      <div className="flex items-center gap-2 text-left">
                        <span className="text-muted-foreground">
                          Variação {index + 1}
                        </span>
                        <RiskBadge level={variation.nivel_risco} className="text-xs" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm pb-3">
                      {variation.descricao}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
