import { Card, CardContent } from "../ui/card";
import QueryErrorState from "./query-error-state";

export function StatCard({
  icon: Icon,
  label,
  value,
  isLoading,
  isError,
  isPlaceholder = false,
  title,
  description,
  isRetrying,
  onRetry,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  isLoading?: boolean;
  isPlaceholder?: boolean;
  isError?: boolean;
  isRetrying?: boolean;
  onRetry?: () => void;
  title?: string;
  description?: string;
}) {
  if (isError) {
    return (
      <QueryErrorState
        title={title}
        description={description}
        isRetrying={isRetrying}
        onRetry={onRetry} // Pass onRetry directly, it can be undefined
      />
    );
  }

  return (
    <Card className="border-border bg-card text-card-foreground shadow-sm hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          {isLoading ? (
            <div className="mt-1 h-6 w-12 animate-pulse rounded bg-muted" />
          ) : isPlaceholder ? (
            <p className="text-sm font-medium text-muted-foreground">
              Coming soon
            </p>
          ) : (
            <p className="text-xl font-bold tracking-tight">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
