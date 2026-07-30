import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton() {
  return (
    <div className="w-full space-y-4 rounded-xl border bg-card p-4 shadow-sm">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-3">
            {/* Avatar / Icon circle */}
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  );
}
