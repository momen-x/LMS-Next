import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="space-y-3 rounded-xl border bg-card p-4 shadow-sm"
        >
          {/* Top Banner / Image area */}
          <Skeleton className="h-32 w-full rounded-lg" />
          {/* Content Lines */}
          <div className="space-y-2 pt-1">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
