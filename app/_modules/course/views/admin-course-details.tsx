"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  FolderTree,
  Globe2,
  GraduationCap,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import defaultCourseImage from "@/public/assets/default-course.png";

import BackBtn from "@/components/sharing/back-btn";
import NoData from "@/components/sharing/no-data";
import QueryErrorState from "@/components/sharing/query-error-state";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";

import { useGetCourse } from "../hooks/useGetCourse";
import transformingTheDateToATextString from "@/utils/from-date-to-string";
import { formatDuration } from "@/utils/format-duration";

interface AdminCourseDetailsProps {
  courseId: string;
  onEdit: string;
  onDelete: string;
  viewStudents: string;
}

function capitalize(value: string): string {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}


function formatLanguage(language: string): string {
  const languages: Record<string, string> = {
    ar: "Arabic",
    en: "English",
    sp: "Spanish",
  };

  return languages[language] ?? language.toUpperCase();
}

function getStatusClasses(status: string): string {
  switch (status) {
    case "published":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "draft":
      return "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400";

    case "archived":
      return "border-muted-foreground/20 bg-muted text-muted-foreground";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

export default function AdminCourseDetails({
  courseId,
  onEdit,
  onDelete,
  viewStudents,
}: AdminCourseDetailsProps) {
  const {
    data: course,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetCourse(courseId);

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load course details"
        description="We couldn’t load the course information. Please try again."
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  if (!course) {
    return <NoData />;
  }

  const isFree = Number(course.price) === 0;

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl space-y-6 bg-background p-4 text-foreground md:p-6">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          <span>Courses</span>

          <ChevronRight className="size-4 shrink-0" />

          <span className="truncate font-medium text-foreground">
            {course.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BackBtn />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-label="Course actions"
                >
                  <MoreHorizontal className="size-4" />
                  Actions
                </Button>
              }
            />

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLinkItem href={onEdit}>
                <Pencil className="mr-2 size-4" />
                Edit course
              </DropdownMenuLinkItem>

              <DropdownMenuSeparator />

              <DropdownMenuLinkItem
                href={onDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 size-4" />
                Delete course
              </DropdownMenuLinkItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Course overview */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-col gap-6 p-5 md:flex-row md:p-6">
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border bg-muted md:w-80">
            <Image
              src={course.thumbnail || defaultCourseImage}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
              priority
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={getStatusClasses(course.status)}
              >
                {capitalize(course.status)}
              </Badge>

              <Badge variant="secondary">{capitalize(course.level)}</Badge>

              <Badge variant="secondary">
                {formatLanguage(course.language)}
              </Badge>
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
              {course.title}
            </h1>

            <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-6 text-muted-foreground">
              {course.description || "No description provided."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Price</span>

                <span className="font-semibold">
                  {isFree ? "Free" : `$${Number(course.price).toFixed(2)}`}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-500 text-amber-500" />

                <span className="font-semibold">
                  {Number(course.averageRating).toFixed(1)}
                </span>

                <span className="text-sm text-muted-foreground">
                  average rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Students"
          value={String(course.totalStudents)}
          icon={<Users className="size-5" />}
        />

        <StatCard
          title="Lessons"
          value={String(course.lessonsCount)}
          icon={<BookOpen className="size-5" />}
        />

        <StatCard
          title="Duration"
          value={formatDuration(course.duration)}
          icon={<Clock3 className="size-5" />}
        />

        <StatCard
          title="Level"
          value={capitalize(course.level)}
          icon={<BarChart3 className="size-5" />}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Course information */}
        <section className="rounded-2xl border bg-card p-5 shadow-sm md:p-6 lg:col-span-2">
          <div>
            <h2 className="text-lg font-semibold">Course information</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              General information available to platform administrators.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InformationItem
              icon={<UserRound className="size-4" />}
              label="Instructor ID"
              value={course.instructorId}
            />

            <InformationItem
              icon={<FolderTree className="size-4" />}
              label="Category ID"
              value={course.categoryId}
            />

            <InformationItem
              icon={<Globe2 className="size-4" />}
              label="Language"
              value={formatLanguage(course.language)}
            />

            <InformationItem
              icon={<GraduationCap className="size-4" />}
              label="Course level"
              value={capitalize(course.level)}
            />
          </div>
        </section>

        {/* Admin actions */}
        <section className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
          <div>
            <h2 className="text-lg font-semibold">Admin actions</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Review related course information.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <Link href={`/admin-dashboard/users/${course.instructorId}`}>
              <Button variant="outline" className="w-full justify-start">
                <UserRound className="size-4" />
                View instructor
              </Button>
            </Link>

            <Link href={viewStudents}>
              <Button variant="outline" className="w-full justify-start">
                <Users className="size-4" />
                View enrollments
              </Button>
            </Link>

            <Link href={onEdit}>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
              >
                <Pencil className="size-4" />
                Edit course
              </Button>
            </Link>
          </div>
        </section>
      </div>

      {/* Dates */}
      <section className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
        <div>
          <h2 className="text-lg font-semibold">Course timeline</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Important dates related to this course.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <DateItem
            title="Created"
            value={transformingTheDateToATextString(course.createdAt)}
          />

          <DateItem
            title="Last updated"
            value={transformingTheDateToATextString(course.updatedAt)}
          />

          <DateItem
            title="Published"
            value={
              course.publishedAt
                ? transformingTheDateToATextString(course.publishedAt)
                : "Not published"
            }
          />
        </div>
      </section>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>

        <p className="truncate text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

interface InformationItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function InformationItem({ label, value, icon }: InformationItemProps) {
  return (
    <div className="rounded-xl border bg-muted/10 p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <p className="text-xs font-medium">{label}</p>
      </div>

      <p className="mt-2 break-all font-mono text-sm text-foreground">
        {value}
      </p>
    </div>
  );
}

interface DateItemProps {
  title: string;
  value: string;
}

function DateItem({ title, value }: DateItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-muted/10 p-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <CalendarDays className="size-4" />
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">{title}</p>

        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
