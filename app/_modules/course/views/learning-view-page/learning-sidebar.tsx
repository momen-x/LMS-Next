"use client";

import {
  CheckCircle2,
  Circle,
  FileQuestion,
  MessageSquareText,
  PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { CourseLearning } from "../../entities/course-learning";

interface LearningSidebarProps {
  course: CourseLearning;

  activeLessonId: string | null;
  activeQuizId: string | null;
  reviewsActive: boolean;

  completedLessonIds: Set<string>;

  onLessonSelect: (lessonId: string) => void;
  onQuizSelect: (quizId: string) => void;
  onReviewsSelect: () => void;
}
export default function LearningSidebar({
  course,
  activeLessonId,
  activeQuizId,
  reviewsActive,
  completedLessonIds,
  onLessonSelect,
  onQuizSelect,
  onReviewsSelect,
}: LearningSidebarProps) {
  return (
    <aside className="min-w-0 border-b bg-card lg:border-r lg:border-b-0">
      <div className="flex max-h-[55svh] flex-col lg:sticky lg:top-0 lg:h-screen lg:max-h-none">
        <div className="shrink-0 border-b px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Course
          </p>

          <h2 className="mt-1 line-clamp-2 font-semibold leading-6">
            {course.title}
          </h2>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground">Progress</span>

              <span className="font-medium">
                {Math.round(course.enrollment?.progress ?? 0)}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min(
                    Math.max(course.enrollment?.progress ?? 0, 0),
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-7 px-3 py-5">
            {course.sections.map((section) => (
              <section key={section.id}>
                <div className="px-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </p>
                </div>

                <div className="mt-2 space-y-1">
                  {section.lessons.map((lesson) => {
                    const isActive = activeLessonId === lesson.id;
                    const isCompleted = completedLessonIds.has(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => onLessonSelect(lesson.id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                        )}
                      >
                        <LessonStatusIcon
                          isActive={isActive}
                          isCompleted={isCompleted}
                        />

                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "line-clamp-2 text-sm leading-5",
                              isActive && "font-medium text-foreground",
                            )}
                          >
                            {lesson.title}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatLessonDuration(lesson.duration)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

            {course.quizzes.length > 0 && (
              <section className="border-t pt-6">
                <div className="px-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Quizzes
                  </p>
                </div>

                <div className="mt-2 space-y-1">
                  {course.quizzes.map((quiz) => {
                    const isActive = activeQuizId === quiz.id;
                    const hasPassed = quiz.attempts.some(
                      (attempt) =>
                        attempt.status === "submitted" &&
                        attempt.score !== null &&
                        attempt.score >= quiz.passingScore,
                    );

                    return (
                      <button
                        key={quiz.id}
                        type="button"
                        onClick={() => onQuizSelect(quiz.id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                        )}
                      >
                        <div className="mt-0.5 shrink-0">
                          {hasPassed ? (
                            <CheckCircle2 className="size-4 text-primary" />
                          ) : (
                            <FileQuestion className="size-4" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "line-clamp-2 text-sm leading-5",
                              isActive && "font-medium text-foreground",
                            )}
                          >
                            {quiz.title}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {quiz.questionCount} questions
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            <section className="border-t pt-6">
              <div className="px-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Reviews
                </p>
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={onReviewsSelect}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                    reviewsActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <MessageSquareText className="mt-0.5 size-4 shrink-0" />

                  <p
                    className={cn(
                      "text-sm leading-5",
                      reviewsActive && "font-medium text-foreground",
                    )}
                  >
                    Course Reviews
                  </p>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </aside>
  );
}

function LessonStatusIcon({
  isActive,
  isCompleted,
}: {
  isActive: boolean;
  isCompleted: boolean;
}) {
  if (isCompleted) {
    return <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />;
  }

  if (isActive) {
    return <PlayCircle className="mt-0.5 size-4 shrink-0 text-foreground" />;
  }

  return <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />;
}

function formatLessonDuration(duration: number) {
  if (!duration) {
    return "0 min";
  }

  const totalMinutes = Math.ceil(duration / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minutes} min`;
}
