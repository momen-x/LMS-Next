"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Eye,
  FileImage,
  Globe,
  GraduationCap,
  Layers3,
  Loader2,
  Search,
  ShieldCheck,
  UserRoundCheck,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import transformingTheDateToATextString from "@/utils/from-date-to-string";

import defaultCourseImage from "@/public/assets/default-course.png";

import { useGetPendingCourses } from "../hooks/useGetPendingCourses";
import { useApproveCourse } from "../hooks/useApproveCourse";
import { useRejectCourse } from "../hooks/useRejectCourse";

export default function PendingCoursesReviewPage() {
  const {
    data: courses = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetPendingCourses();

  const approveMutation = useApproveCourse();
  const rejectMutation = useRejectCourse();

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredCourses = useMemo(() => {
    if (!normalizedSearchQuery) {
      return courses;
    }

    return courses.filter((course) => {
      const titleMatches = course.title
        .toLowerCase()
        .includes(normalizedSearchQuery);

      const instructorMatches =
        course.instructor?.name
          ?.toLowerCase()
          .includes(normalizedSearchQuery) ?? false;

      return titleMatches || instructorMatches;
    });
  }, [courses, normalizedSearchQuery]);

  const selectedCourse = useMemo(() => {
    if (filteredCourses.length === 0) {
      return null;
    }

    return (
      filteredCourses.find((course) => course.id === selectedCourseId) ??
      filteredCourses[0]
    );
  }, [filteredCourses, selectedCourseId]);

  const isMutating = approveMutation.isPending || rejectMutation.isPending;

  const clearSelectionAfterDecision = () => {
    setRejectReason("");
    setSelectedCourseId(null);
  };

  const handleApprove = () => {
    if (!selectedCourse || isMutating) {
      return;
    }

    approveMutation.mutate(selectedCourse.id, {
      onSuccess: () => {
        clearSelectionAfterDecision();
        toast.success("Course approved successfully");
      },
      onError: () => {
        toast.error("Failed to approve course");
      },
    });
  };

  const handleReject = () => {
    if (!selectedCourse || isMutating) {
      return;
    }

    rejectMutation.mutate(
      {
        courseId: selectedCourse.id,
        data: {
          text: rejectReason.trim(),
        },
      },
      {
        onSuccess: () => {
          clearSelectionAfterDecision();
          toast.success("Course rejected successfully");
        },
        onError: () => {
          toast.error("Failed to reject course");
        },
      },
    );
  };

  if (isLoading) {
    return <PendingCoursesReviewSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <XCircle className="size-8 text-destructive" />

          <h2 className="mt-4 text-lg font-semibold">
            Failed to load pending courses
          </h2>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Something went wrong while loading the courses awaiting review.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-5"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching && <Loader2 className="size-4 animate-spin" />}
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 px-4 py-6 md:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Courses Awaiting Review
            </h1>

            <Badge className="border border-amber-500/20 bg-amber-500/10 text-amber-600 hover:bg-amber-500/10 dark:text-amber-400">
              {courses.length}
            </Badge>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Review submitted courses and approve them or return them to the
            instructor.
          </p>
        </div>
      </header>

      {courses.length === 0 ? (
        <EmptyPendingCourses />
      ) : (
        <div className="grid items-start gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
          {/* Course queue */}
          <aside className="space-y-4 xl:sticky xl:top-20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchQuery}
                placeholder="Search by course or instructor..."
                className="h-10 pl-9"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>

            {filteredCourses.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center">
                <Search className="mx-auto size-6 text-muted-foreground" />

                <p className="mt-3 text-sm font-medium">No matching courses</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Try searching with another title or instructor name.
                </p>
              </div>
            ) : (
              <div className="max-h-[calc(100dvh-250px)] space-y-3 overflow-y-auto pr-1">
                {filteredCourses.map((course) => {
                  const isSelected = selectedCourse?.id === course.id;

                  return (
                    <button
                      key={course.id}
                      type="button"
                      disabled={isMutating}
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        setRejectReason("");
                      }}
                      className={cn(
                        "flex w-full gap-3 rounded-xl border bg-card p-3 text-left transition-all",
                        "hover:border-amber-500/50 hover:bg-amber-500/5",
                        "disabled:pointer-events-none disabled:opacity-60",
                        isSelected &&
                          "border-amber-500 bg-amber-500/5 ring-1 ring-amber-500/30",
                      )}
                    >
                      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border bg-muted">
                        <Image
                          src={course.thumbnail || defaultCourseImage}
                          alt={course.title}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="truncate text-sm font-semibold">
                            {course.title}
                          </h2>

                          <span
                            className={cn(
                              "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
                              isSelected
                                ? "border-amber-500 bg-amber-500"
                                : "border-muted-foreground/40",
                            )}
                          >
                            {isSelected && (
                              <span className="size-1.5 rounded-full bg-white" />
                            )}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {course.instructor?.name ?? "Unknown instructor"}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="px-2 py-0 text-[10px] capitalize"
                          >
                            {course.level}
                          </Badge>

                          <Badge className="border border-amber-500/20 bg-amber-500/10 px-2 py-0 text-[10px] text-amber-600 hover:bg-amber-500/10 dark:text-amber-400">
                            Pending Review
                          </Badge>
                        </div>

                        <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Calendar className="size-3" />
                          {transformingTheDateToATextString(course.createdAt)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </aside>

          {/* Selected course review */}
          {selectedCourse && (
            <main className="min-w-0 space-y-5">
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-[minmax(280px,42%)_1fr]">
                  <div className="relative min-h-64 bg-muted lg:min-h-full">
                    <Image
                      src={selectedCourse.thumbnail || defaultCourseImage}
                      alt={selectedCourse.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="flex flex-col justify-center p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="border border-amber-500/20 bg-amber-500/10 text-amber-600 hover:bg-amber-500/10 dark:text-amber-400">
                        Pending Review
                      </Badge>

                      <Badge variant="secondary" className="capitalize">
                        {selectedCourse.level}
                      </Badge>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight">
                      {selectedCourse.title}
                    </h2>

                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {selectedCourse.description ||
                        "No course description was provided."}
                    </p>

                    <div className="mt-5 flex items-center gap-3 border-t pt-5">
                      <Avatar className="size-10">
                        <AvatarImage
                          src={selectedCourse.instructor?.avatar ?? undefined}
                          alt={selectedCourse.instructor?.name ?? "Instructor"}
                        />

                        <AvatarFallback>
                          {selectedCourse.instructor?.name
                            ?.charAt(0)
                            .toUpperCase() ?? "I"}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-sm font-semibold">
                          {selectedCourse.instructor?.name ??
                            "Unknown instructor"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Course instructor
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>

              {/* Course facts */}
              <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <CourseFact
                  icon={GraduationCap}
                  label="Level"
                  value={capitalize(selectedCourse.level)}
                />

                <CourseFact
                  icon={Globe}
                  label="Language"
                  value={selectedCourse.language.toUpperCase()}
                />

                <CourseFact
                  icon={DollarSign}
                  label="Price"
                  value={
                    selectedCourse.price === 0
                      ? "Free"
                      : `$${selectedCourse.price.toFixed(2)}`
                  }
                />

                <CourseFact
                  icon={BookOpen}
                  label="Lessons"
                  value={String(selectedCourse.lessonsCount)}
                />
              </section>

              {/* Review checklist */}
              <Card>
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <ShieldCheck className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">Review checklist</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Check the essential course information before making a
                        decision.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <ChecklistItem
                      label="Course thumbnail uploaded"
                      passed={Boolean(selectedCourse.thumbnail)}
                      icon={FileImage}
                    />

                    <ChecklistItem
                      label="Valid instructor assigned"
                      passed={Boolean(
                        selectedCourse.instructorId ||
                        selectedCourse.instructor,
                      )}
                      icon={UserRoundCheck}
                    />

                    <ChecklistItem
                      label="Valid category assigned"
                      passed={Boolean(selectedCourse.categoryId)}
                      icon={Layers3}
                    />

                    <ChecklistItem
                      label="At least one lesson added"
                      passed={selectedCourse.lessonsCount > 0}
                      icon={BookOpen}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3 border-t pt-5">
                    <Link
                      href={`/courses/${selectedCourse.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "gap-2",
                      )}
                    >
                      <Eye className="size-4" />
                      Preview Course
                    </Link>

                    <Link
                      href={`/admin-dashboard/courses/${selectedCourse.id}/course`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "gap-2",
                      )}
                    >
                      <ExternalLink className="size-4" />
                      View Full Details
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Decision */}
              <Card>
                <CardContent className="space-y-5 p-5 md:p-6">
                  <div>
                    <h3 className="font-semibold">Admin decision</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Approve the course for publishing or return it with a
                      helpful rejection message.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="rejection-message"
                      className="text-sm font-medium"
                    >
                      Rejection message
                      <span className="ml-1 font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>

                    <Textarea
                      id="rejection-message"
                      value={rejectReason}
                      maxLength={500}
                      disabled={isMutating}
                      placeholder="Explain what the instructor should improve before submitting again..."
                      className="min-h-32 resize-none"
                      onChange={(event) => setRejectReason(event.target.value)}
                    />

                    <p className="text-right text-xs text-muted-foreground">
                      {rejectReason.length}/500
                    </p>
                  </div>

                  <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isMutating}
                      className="gap-2 sm:min-w-40"
                      onClick={handleReject}
                    >
                      {rejectMutation.isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <XCircle className="size-4" />
                      )}
                      Reject Course
                    </Button>

                    <Button
                      type="button"
                      disabled={isMutating}
                      className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 sm:min-w-40"
                      onClick={handleApprove}
                    >
                      {approveMutation.isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Check className="size-4" />
                      )}
                      Approve Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </main>
          )}
        </div>
      )}
    </div>
  );
}

interface CourseFactProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function CourseFact({ icon: Icon, label, value }: CourseFactProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 truncate text-sm font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface ChecklistItemProps {
  label: string;
  passed: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

function ChecklistItem({ label, passed, icon: Icon }: ChecklistItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border p-3",
        passed
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-destructive/20 bg-destructive/5",
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          passed
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-destructive/10 text-destructive",
        )}
      >
        <Icon className="size-4" />
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="text-sm font-medium">{label}</span>

        {passed ? (
          <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
        ) : (
          <XCircle className="size-4 shrink-0 text-destructive" />
        )}
      </div>
    </div>
  );
}

function EmptyPendingCourses() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="size-7" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">Review queue is empty</h2>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        There are no courses waiting for approval at the moment.
      </p>
    </div>
  );
}

function PendingCoursesReviewSkeleton() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-6 md:px-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>

        <div className="space-y-5">
          <Skeleton className="h-80 w-full rounded-xl" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-20 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-56 w-full rounded-xl" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
