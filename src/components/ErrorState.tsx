import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Ocorreu um erro ao carregar os dados. Por favor, tente novamente.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle className="w-16 h-16 text-destructive mb-4" aria-hidden="true" />
      <p className="text-lg font-medium text-foreground mb-2">Erro ao carregar dados</p>
      <p className="text-sm text-muted-foreground max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="default">
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
