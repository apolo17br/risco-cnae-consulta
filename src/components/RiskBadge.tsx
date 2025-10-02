import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { RiskLevel } from "@/lib/supabase";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const riskConfig = {
  Baixo: {
    icon: CheckCircle,
    className: "bg-risk-low-bg text-risk-low border-risk-low",
    ariaLabel: "Risco sanitário baixo",
  },
  Médio: {
    icon: AlertTriangle,
    className: "bg-risk-medium-bg text-risk-medium border-risk-medium",
    ariaLabel: "Risco sanitário médio",
  },
  Alto: {
    icon: AlertCircle,
    className: "bg-risk-high-bg text-risk-high border-risk-high",
    ariaLabel: "Risco sanitário alto",
  },
};

export function RiskBadge({ level, className = "" }: RiskBadgeProps) {
  const config = riskConfig[level];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`${config.className} ${className} font-semibold`}
      aria-label={config.ariaLabel}
    >
      <Icon className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
      {level}
    </Badge>
  );
}
