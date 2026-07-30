"use client";

import { AlertCircle, Loader2, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QueryErrorStateProps {
  title?: string;
  description?: string;
  isRetrying?: boolean;
  onRetry?: () => void;
}

export default function QueryErrorState({
  title = "Something went wrong",
  description = "We couldn’t load this data. Please try again.",
  isRetrying = false,
  onRetry,
}: QueryErrorStateProps) {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-6 text-destructive" />
      </div>

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-5"
          disabled={isRetrying}
          onClick={onRetry}
        >
          {isRetrying ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <RefreshCcw className="size-4" />
          )}

          {isRetrying ? "Trying again..." : "Try again"}
        </Button>
      )}
    </div>
  );
}