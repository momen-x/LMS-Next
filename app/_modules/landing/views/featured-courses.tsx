
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import QueryErrorState from "@/components/sharing/query-error-state";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import { cn } from "@/lib/utils";
import { useSearchCourses } from "../../course/hooks/useSearchCourses";
import { CourseCard } from "../../course/views/course-card";



export default function FeaturedCourses() {
  const { data, isLoading, isError, isFetching, refetch } = useSearchCourses({
    page: 1,
    limit: 4,
  });

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ListSkeleton />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <QueryErrorState
          title="Failed to load courses"
          description="We couldn’t load featured courses."
          isRetrying={isFetching}
          onRetry={refetch}
        />
      </section>
    );
  }

  const courses = data?.courses ?? [];

  if (!courses.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Start learning</p>

          <h2 className="mt-2 text-3xl font-bold">Featured Courses</h2>

          <p className="mt-2 text-muted-foreground">
            Explore some of the courses available on our platform.
          </p>
        </div>

        <Link
          href="/courses"
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
        >
          View All Courses
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
