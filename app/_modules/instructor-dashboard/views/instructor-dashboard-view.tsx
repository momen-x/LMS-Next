"use client";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  FileEdit,
  Users,
  Plus,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";
import NoData from "@/components/sharing/no-data";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { useGetInstructorCourses } from "../../course/hooks/useGetInstructorCourses";
import { useGetInstructorEnrollmentStats } from "../../course/hooks/useGetInstructorEnrollmentStats";
import { StatCard } from "@/components/sharing/state-card";

export default function InstructorDashboardView() {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetInstructorEnrollmentStats();
  const {
    data: courses,
    isLoading: isLoadingCourses,
    isError: isCoursesError,
    refetch: refetchCourses,
    isFetching: isCoursesFetching,
  } = useGetInstructorCourses();

  const totalPublished = courses
    ? courses.filter((course) => course.status === "published").length
    : 0;
  const totalDraft = courses
    ? courses.filter((course) => course.status === "draft").length
    : 0;

  const coursesNeedingAttention = (courses ?? [])
    .flatMap((course) => {
      const issues: {
        id: string;
        message: string;
        actionLabel: string;
        href: string;
      }[] = [];

      if (course.lessonsCount === 0) {
        issues.push({
          id: `${course.id}-no-lessons`,
          message: `${course.title}: no lessons added`,
          actionLabel: "Add lessons",
          href: `/instructor-dashboard/courses/${course.id}/sections`,
        });
      }

      if (course.status === "draft") {
        issues.push({
          id: `${course.id}-draft`,
          message: `${course.title}: still in draft`,
          actionLabel: "Continue setup",
          href: `/instructor-dashboard/courses/${course.id}/details`,
        });
      }

      if (course.totalStudents === 0 && course.status === "published") {
        issues.push({
          id: `${course.id}-no-students`,
          message: `${course.title}: no students enrolled`,
          actionLabel: "View course",
          href: `/instructor-dashboard/courses/${course.id}/details`,
        });
      }

      return issues;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6 p-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your courses and teaching activity.
          </p>
        </div>
        <Link href="/instructor/courses/new">
          <Button className="gap-2">
            <Plus className="size-4" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading || isLoadingCourses ? (
          <ListSkeleton />
        ) : (
          <>
            <StatCard
              icon={BookOpen}
              label="Total Courses"
              value={data?.totalCourses || 0}
              isLoading={isLoadingCourses}
              isError={isError}
              isRetrying={isFetching}
              onRetry={() => refetch()}
              title="Can't load courses"
              description="Something went wrong while loading courses."
            />
            <StatCard
              icon={CheckCircle2}
              label="Total Publish Courses"
              value={totalPublished}
              isLoading={isLoadingCourses}
              isError={isCoursesError}
              isRetrying={isCoursesFetching}
              onRetry={() => refetchCourses()}
              title="Can't load courses"
              description="Something went wrong while loading courses."
            />
            <StatCard
              icon={FileEdit}
              label="Total Draft Courses"
              value={totalDraft}
              isLoading={isLoadingCourses}
              isError={isCoursesError}
              isRetrying={isCoursesFetching}
              onRetry={() => refetchCourses()}
              title="Can't load courses"
              description="Something went wrong while loading courses."
            />
            <StatCard
              icon={Users}
              label="Total Users"
              value={data?.totalEnrollments || 0}
              isLoading={isLoading}
              isError={isError}
              isRetrying={isFetching}
              onRetry={() => refetch()}
              title="Can't load users"
              description="Something went wrong while loading users."
            />
          </>
        )}
      </div>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">My Recent Courses</CardTitle>
            <Link href="/instructor-dashboard/courses">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all
                <ArrowRight className="size-3" />
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            {isLoadingCourses ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading courses...
              </div>
            ) : isCoursesError ? (
              <QueryErrorState
                title="Failed to load your Courses"
                description="We couldn’t load your courses."
                isRetrying={isCoursesFetching}
                onRetry={() => refetchCourses()}
              />
            ) : courses && courses.length > 0 ? (
              <div className="divide-y divide-border rounded-lg border">
                {courses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 shrink-0 rounded-md bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                        {course.thumbnail ? (
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            className="size-full rounded-md object-cover"
                            width={40}
                            height={40}
                          />
                        ) : (
                          "Thumbnail"
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-[10px] border",
                              course.status === "published"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : course.status === "draft"
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                  : "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
                            )}
                          >
                            {course.status}
                          </Badge>
                          <span>•</span>
                          <span>{course.totalStudents ?? 0} students</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/instructor-dashboard/courses/${course.id}/details`}
                    >
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <NoData />
            )}
          </CardContent>
        </Card>

      {/* 4. Bottom Grid: Attention & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Courses needing attention */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="size-4 text-amber-500" />
              Courses needing attention
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Courses that may need additional setup or review.
            </p>
          </CardHeader>

          <CardContent>
            {isLoadingCourses ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-14 animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            ) : isCoursesError ? (
              <QueryErrorState
                title="Failed to check your courses"
                description="We couldn’t determine which courses need attention."
                isRetrying={isCoursesFetching}
                onRetry={() => refetchCourses()}
              />
            ) : coursesNeedingAttention.length > 0 ? (
              <div className="space-y-3">
                {coursesNeedingAttention.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 transition-colors hover:bg-amber-500/10 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                        <AlertCircle className="size-4 text-amber-600 dark:text-amber-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {item.message}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Review this course to keep its content ready for
                          students.
                        </p>
                      </div>
                    </div>

                    <Link
                      href={item.href}
                      className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-800 hover:underline dark:text-amber-400 dark:hover:text-amber-300"
                    >
                      {item.actionLabel}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <h4 className="mt-3 font-medium">Everything looks good</h4>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Your courses do not currently require any immediate attention.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/instructor-dashboard/courses/create">
              <Button variant="outline" className="justify-start gap-2">
                <Plus className="size-4 text-primary" />
                Create Course
              </Button>
            </Link>
            <Link href="/instructor-dashboard/courses">
              <Button variant="outline" className="justify-start gap-2">
                <BookOpen className="size-4 text-primary" />
                My Courses
              </Button>
            </Link>
            {/* todo create this page */}
            {/* <Link href="/instructor-dashboard/enrollments">
              <Button variant="outline" className="justify-start gap-2">
                <Users className="size-4 text-primary" />
                View Enrollments
              </Button>
            </Link> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
