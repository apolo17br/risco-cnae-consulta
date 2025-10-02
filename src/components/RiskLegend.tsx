import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

export function RiskLegend() {
  return (
    <div
      className="flex flex-wrap items-center gap-4 text-sm p-4 bg-muted/50 rounded-lg mb-6"
      role="region"
      aria-label="Legenda dos níveis de risco"
    >
      <span className="font-medium text-foreground">Legenda:</span>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-risk-low" aria-hidden="true" />
        <span className="text-muted-foreground">I - Baixo (Verde)</span>
      </div>
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-risk-medium" aria-hidden="true" />
        <span className="text-muted-foreground">II - Médio (Amarelo)</span>
      </div>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-risk-high" aria-hidden="true" />
        <span className="text-muted-foreground">III - Alto (Vermelho)</span>
      </div>
    </div>
  );
}
