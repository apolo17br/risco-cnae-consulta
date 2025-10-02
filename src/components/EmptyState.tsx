import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "Nenhuma atividade encontrada com os filtros aplicados.",
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <FileQuestion className="w-16 h-16 text-muted-foreground mb-4" aria-hidden="true" />
      <p className="text-lg font-medium text-foreground mb-2">
        Nenhum resultado encontrado
      </p>
      <p className="text-sm text-muted-foreground max-w-md">
        {message}
      </p>
    </div>
  );
}
