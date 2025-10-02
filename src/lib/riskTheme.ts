import { RiskLevel } from "@/lib/supabase";
import { AlertCircle, AlertTriangle, CheckCircle, HelpCircle, type LucideIcon } from "lucide-react";

interface RiskToneConfig {
  icon: LucideIcon;
  badgeClassName: string;
  ariaLabel: string;
  rowClassName: string;
  surfaceClassName: string;
}

const riskToneConfig: Record<RiskLevel, RiskToneConfig> = {
  "I - Baixo": {
    icon: CheckCircle,
    badgeClassName: "bg-risk-low-bg text-risk-low border-risk-low",
    ariaLabel: "Risco sanitário nível I - Baixo",
    rowClassName: "bg-risk-low-bg text-foreground border-l-4 border-risk-low shadow-sm",
    surfaceClassName: "bg-risk-low-bg text-foreground border border-risk-low shadow-sm",
  },
  "II - Médio": {
    icon: AlertTriangle,
    badgeClassName: "bg-risk-medium-bg text-risk-medium border-risk-medium",
    ariaLabel: "Risco sanitário nível II - Médio",
    rowClassName: "bg-risk-medium-bg text-foreground border-l-4 border-risk-medium shadow-sm",
    surfaceClassName: "bg-risk-medium-bg text-foreground border border-risk-medium shadow-sm",
  },
  "III - Alto": {
    icon: AlertCircle,
    badgeClassName: "bg-risk-high-bg text-risk-high border-risk-high",
    ariaLabel: "Risco sanitário nível III - Alto",
    rowClassName: "bg-risk-high-bg text-foreground border-l-4 border-risk-high shadow-sm",
    surfaceClassName: "bg-risk-high-bg text-foreground border border-risk-high shadow-sm",
  },
};

const fallbackToneConfig: RiskToneConfig = {
  icon: HelpCircle,
  badgeClassName: "bg-muted text-muted-foreground border-muted-foreground/60",
  ariaLabel: "Nível de risco desconhecido",
  rowClassName: "bg-muted text-foreground border-l-4 border-muted-foreground shadow-sm",
  surfaceClassName: "bg-muted text-foreground border border-muted-foreground shadow-sm",
};

export function getRiskToneConfig(level: RiskLevel | null | undefined): RiskToneConfig {
  if (!level) {
    return fallbackToneConfig;
  }

  return riskToneConfig[level] ?? fallbackToneConfig;
}
