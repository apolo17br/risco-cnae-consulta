import { CheckCircle2, Loader2, Shield, XCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ConnectionStatus = "checking" | "connected" | "error";

interface CNAEHeaderProps {
  connectionStatus: ConnectionStatus;
}

const CONNECTION_STATUS_COPY: Record<ConnectionStatus, { label: string; tone: string }> = {
  checking: {
    label: "Verificando conexão com o Supabase...",
    tone: "bg-white/10 text-primary-foreground",
  },
  connected: {
    label: "Conexão com o Supabase ativa",
    tone: "bg-emerald-500/15 text-emerald-100",
  },
  error: {
    label: "Falha na conexão com o Supabase",
    tone: "bg-destructive/15 text-destructive",
  },
};

const CONNECTION_STATUS_ICON: Record<ConnectionStatus, typeof CheckCircle2> = {
  checking: Loader2,
  connected: CheckCircle2,
  error: XCircle,
};

export function CNAEHeader({ connectionStatus }: CNAEHeaderProps) {
  const statusCopy = CONNECTION_STATUS_COPY[connectionStatus];
  const StatusIcon = CONNECTION_STATUS_ICON[connectionStatus];

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
            <div className="mt-3">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm font-medium",
                  statusCopy.tone
                )}
                role="status"
                aria-live="polite"
              >
                <StatusIcon
                  className={cn("h-4 w-4", connectionStatus === "checking" && "animate-spin")}
                  aria-hidden="true"
                />
                {statusCopy.label}
              </span>
            </div>
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
