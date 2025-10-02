import { Badge } from "@/components/ui/badge";
import { RiskLevel } from "@/lib/supabase";
import { getRiskToneConfig } from "@/lib/riskTheme";

interface RiskBadgeProps {
  level: RiskLevel | null | undefined;
  className?: string;
}

export function RiskBadge({ level, className = "" }: RiskBadgeProps) {
  const normalizedLevel = level && (level as RiskLevel);
  const toneConfig = getRiskToneConfig(normalizedLevel);
  const Icon = toneConfig.icon;
  const label = normalizedLevel ?? "Indefinido";

  return (
    <Badge
      variant="outline"
      className={`${toneConfig.badgeClassName} ${className} font-semibold`}
      aria-label={toneConfig.ariaLabel}
    >
      <Icon className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
      {label}
    </Badge>
  );
}
