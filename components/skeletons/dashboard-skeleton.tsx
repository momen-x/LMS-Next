import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      {/* Breadcrumb / Title Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-2/3 max-w-md" />
      </div>

      {/* Top Card: Add Enrollment Section */}
      <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <Skeleton className="h-9 w-28 rounded-md" />
      </div>

      {/* Bottom Section: Course Enrollments */}
      <div className="space-y-4 pt-4">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-56" />
        </div>

        {/* Enrollment Cards List */}
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-48" />
                <div className="flex items-center gap-2 pt-1">
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="h-3.5 w-40" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 md:justify-end">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-2 w-32 rounded-full" />
                </div>
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
