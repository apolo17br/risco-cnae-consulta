import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { RiskLevel } from "@/lib/supabase";

interface RiskBadgeProps {
  level: RiskLevel | null | undefined;
  className?: string;
}

const riskConfig: Record<
  RiskLevel,
  { icon: typeof CheckCircle; className: string; ariaLabel: string }
> = {
  "I - Baixo": {
    icon: CheckCircle,
    className: "bg-risk-low-bg text-risk-low border-risk-low",
    ariaLabel: "Risco sanitário nível I - Baixo",
  },
  "II - Médio": {
    icon: AlertTriangle,
    className: "bg-risk-medium-bg text-risk-medium border-risk-medium",
    ariaLabel: "Risco sanitário nível II - Médio",
  },
  "III - Alto": {
    icon: AlertCircle,
    className: "bg-risk-high-bg text-risk-high border-risk-high",
    ariaLabel: "Risco sanitário nível III - Alto",
  },
};

const fallbackConfig = {
  icon: HelpCircle,
  className: "bg-muted text-muted-foreground border-muted-foreground/60",
  ariaLabel: "Nível de risco desconhecido",
} as const;

export function RiskBadge({ level, className = "" }: RiskBadgeProps) {
  const normalizedLevel = level && level in riskConfig ? (level as RiskLevel) : null;
  const config = normalizedLevel ? riskConfig[normalizedLevel] : fallbackConfig;
  const Icon = config.icon;
  const label = normalizedLevel ?? "Indefinido";

  return (
    <Badge
      variant="outline"
      className={`${config.className} ${className} font-semibold`}
      aria-label={normalizedLevel ? config.ariaLabel : fallbackConfig.ariaLabel}
    >
      <Icon className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
      {label}
    </Badge>
  );
}
