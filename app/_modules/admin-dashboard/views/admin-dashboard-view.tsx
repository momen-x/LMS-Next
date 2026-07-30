"use client";

import { Users, BookOpen, GraduationCap, FolderKanban } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NoData from "@/components/sharing/no-data";
import EmptyCourses from "@/app/_modules/course/views/empty-courses";
import QueryErrorState from "@/components/sharing/query-error-state";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import Image from "next/image";

import { useGetUsers } from "@/app/_modules/user/hooks/useGetAllUsers";
import { useGetAllCourses } from "@/app/_modules/course/hooks/useGetAllCourses";
import { useGetAllCategories } from "@/app/_modules/category/hooks/useGetAllCategories";
import { useGetCurrentUser } from "../../user/hooks/useGetCurrentUser";

import transformingTheDateToATextString from "@/utils/from-date-to-string";

import defaultUserImage from "@/public/assets/default-user1.png";
import { StatCard } from "@/components/sharing/state-card";


export default function DashboardPage() {
  const { data: usersData, isLoading: isLoadingUsers } = useGetUsers({
    page: 1,
    limit: 5,
  });

  const {
    data: coursesData,
    isLoading: isLoadingCourses,
    refetch: refetchCourses,
    isFetching: isCoursesFetching,
    isError: isCoursesError,
  } = useGetAllCourses();

  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    isError: isCurrentUserError,
    refetch: refetchCurrentUser,
    isFetching: isCurrentUserFetching,
  } = useGetCurrentUser();

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    refetch: refetchCategories,
    isFetching: isCategoriesFetching,
  } = useGetAllCategories();

  const recentUsers = usersData?.users ?? [];
  const totalUsers = usersData?.meta.total ?? 0;

  const recentCourses = (coursesData ?? []).slice(0, 5);
  const totalCourses = coursesData?.length ?? 0;

  const totalCategories = categoriesData?.length ?? 0;

  if (isLoadingCurrentUser || isLoadingCategories) {
    return <ListSkeleton />;
  }

  if (isCurrentUserError) {
    return (
      <QueryErrorState
        title="Failed to load your data, please try again"
        description="We couldn’t load load your data."
        isRetrying={isCurrentUserFetching}
        onRetry={() => refetchCurrentUser()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 text-foreground transition-colors sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {currentUser?.name} 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your platform today.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total Users"
            value={totalUsers}
            isLoading={isLoadingUsers}
          />
          <StatCard
            icon={BookOpen}
            label="Total Courses"
            value={totalCourses}
            isLoading={isLoadingCourses}
            isError={isCoursesError}
            isRetrying={isCoursesFetching}
            onRetry={() => refetchCourses()}
            title="can't load the courses"
            description="some thing went wrong with load the course"
          />
          <StatCard
            icon={GraduationCap}
            label="Total Enrollments"
            value=""
            isPlaceholder
          />
          <StatCard
            icon={FolderKanban}
            label="Total Categories"
            value={totalCategories}
            isLoading={isLoadingCategories}
            isError={isCategoriesError}
            isRetrying={isCategoriesFetching}
            onRetry={() => refetchCategories()}
            title="can't load the categories"
            description="some thing went wrong with load the categories"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-border bg-card text-card-foreground shadow-sm">
            <CardContent className="pt-6">
              <h3 className="mb-4 text-base font-semibold">Recent Users</h3>

              {isLoadingUsers ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 animate-pulse rounded-lg bg-muted"
                    />
                  ))}
                </div>
              ) : recentUsers.length > 0 ? (
                <ul className="space-y-3">
                  {recentUsers.map((user) => (
                    <li
                      key={user.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border/60 p-2.5"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={user.avatar || defaultUserImage.src}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name?.slice(0, 2).toUpperCase() || "US"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <p className="truncate text-sm font-medium">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="shrink-0 border-0 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                      >
                        {user.role}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <NoData />
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-card text-card-foreground shadow-sm">
            <CardContent className="pt-6">
              <h3 className="mb-4 text-base font-semibold">Recent Courses</h3>

              {isLoadingCourses ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 animate-pulse rounded-lg bg-muted"
                    />
                  ))}
                </div>
              ) : recentCourses.length > 0 ? (
                <ul className="space-y-3">
                  {recentCourses.map((course) => (
                    <li
                      key={course.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border/60 p-2.5"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {course.thumbnail ? (
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={40}
                            height={40}
                            className="h-10 w-10 shrink-0 rounded-md border object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="truncate text-sm font-medium">
                            {course.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {transformingTheDateToATextString(course.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          course.status === "published"
                            ? "shrink-0 border-0 bg-emerald-500/10 text-emerald-500"
                            : course.status === "draft"
                              ? "shrink-0 border-0 bg-amber-500/10 text-amber-500"
                              : "shrink-0 border-0 bg-muted text-muted-foreground"
                        }
                      >
                        {course.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyCourses />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
