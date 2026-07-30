import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="w-full space-y-4 rounded-xl border bg-card p-4 shadow-sm">
      {/* Table Header Controls */}
      <div className="flex items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      {/* Table Columns & Rows */}
      <div className="space-y-3">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b pb-3 pt-1">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>

        {/* Data Rows */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/6" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
