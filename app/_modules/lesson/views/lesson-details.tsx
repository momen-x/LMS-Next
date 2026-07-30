"use client";

import {
  ArrowRight,
  BookOpen,
  Clock3,
  Eye,
  EyeOff,
  FileText,
  HelpCircle,
  Link2,
  Pencil,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useGetLesson } from "@/app/_modules/lesson/hooks/useGetLesson";
import Link from "next/link";
import BackBtn from "@/components/sharing/back-btn";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";
import NoData from "@/components/sharing/no-data";

function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  if (minutes > 0) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  return `${seconds}s`;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export default function LessonDetails({
  manageMedia,
  manageQuiz,
}: {
  manageMedia: string;
  manageQuiz: string;
}) {
  const router = useRouter();

  const params = useParams<{
    id: string;
  }>();

  const lessonId = params.id;

  const {
    data: lesson,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetLesson(lessonId);

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load lesson details"
        description="We couldn’t load the lesson for this section. Please try again"
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  if (!lesson) {
    return <NoData />;
  }

  const resourcesCount = lesson.resources?.length ?? 0;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Lesson details
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage the lesson content, media and quiz.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <BackBtn />
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/instructor-dashboard/lessons/${lesson.id}/update`)
            }
          >
            <Pencil className="size-4" />
            Edit lesson
          </Button>
        </div>
      </div>

      {/* Lesson overview */}
      <section className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold md:text-2xl">
                  {lesson.title}
                </h2>

                {lesson.isPreview ? (
                  <Badge className="gap-1 border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400">
                    <Eye className="size-3.5" />
                    Preview enabled
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <EyeOff className="size-3.5" />
                    Preview disabled
                  </Badge>
                )}
              </div>

              <p className="mt-3 max-w-4xl whitespace-pre-line text-sm leading-6 text-muted-foreground">
                {lesson.description || "No description added for this lesson."}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold">
                  {formatDuration(lesson.duration)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Lesson order</p>
                <p className="font-semibold">{lesson.order}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Link2 className="size-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Resources</p>
                <p className="font-semibold">{resourcesCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="size-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="font-semibold">{formatDate(lesson.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Quick Actions</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage the lesson media and quiz from here.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={manageMedia}
            className="group rounded-xl border bg-muted/20 p-5 transition-all hover:border-primary/40 hover:bg-muted/40 hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="font-semibold transition-colors group-hover:text-primary">
                  Manage Media
                </h4>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  Add, view, update, or remove lesson videos, audio, and
                  documents.
                </p>
              </div>

              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </Link>

          <Link
            href={manageQuiz}
            className="group rounded-xl border bg-muted/20 p-5 transition-all hover:border-primary/40 hover:bg-muted/40 hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HelpCircle className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="font-semibold transition-colors group-hover:text-primary">
                  Manage Quiz
                </h4>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  Create the lesson quiz and manage its questions and choices.
                </p>
              </div>

              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </Link>
        </div>
      </div>
      {/* Resources */}
      {resourcesCount > 0 && (
        <section className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
          <div>
            <h2 className="text-lg font-semibold">Lesson resources</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Additional links and files attached to this lesson.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {lesson.resources?.map((resource, index) => (
              <div
                key={`${resource}-${index}`}
                className="flex items-center gap-3 rounded-xl border p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Link2 className="size-4 text-muted-foreground" />
                </div>

                <p className="min-w-0 flex-1 truncate text-sm">
                  {JSON.stringify(resource)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
