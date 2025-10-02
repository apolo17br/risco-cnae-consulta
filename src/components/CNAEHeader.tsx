import { Shield } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function CNAEHeader() {
  return (
    <header className="bg-primary text-primary-foreground py-6 px-4 mb-8 rounded-lg shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-4">
          <Shield className="w-10 h-10 flex-shrink-0 mt-1" aria-hidden="true" />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Consulta de Atividades Econômicas
            </h1>
            <p className="text-sm md:text-base opacity-90">
              Superintendência de Vigilância em Saúde - Itajaí/SC
            </p>
            <p className="text-xs md:text-sm opacity-75 mt-1">
              Classificação por Nível de Risco Sanitário
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" disabled className="opacity-60">
                  Novo
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Operação restrita — somente leitura</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" disabled className="opacity-60">
                  Editar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Operação restrita — somente leitura</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" disabled className="opacity-60">
                  Excluir
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Operação restrita — somente leitura</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
