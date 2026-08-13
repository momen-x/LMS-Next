"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import {
  Award,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Globe2,
  Loader2,
  Play,
  Share2,
  Star,
  Users,
} from "lucide-react";
import EnrollmentButton from "../../payment/views/enrollment-button.tsx";
import BackBtn from "@/components/sharing/back-btn";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import { useGetCourse } from "../hooks/useGetCourse";
import { formatDuration } from "@/utils/format-duration";
import { getErrorMessage } from "@/utils/get-axios-error-message";
import { useGetPreviewLessons } from "../../lesson/hooks/useGetPreviewLessons";
import CoursePreviewLessons from "../../lesson/views/course-preview-lessons";

type CourseTab = "overview" | "curriculum" | "instructor" | "reviews";

interface CourseInfoProps {
  id: string;
}
export default function CourseInfo({ id }: CourseInfoProps) {
  const { data: course, isLoading, isError } = useGetCourse(id);
  const { data: previewLessons, isLoading: isPreviewLessonsLoading } =
    useGetPreviewLessons(id);
  const [activeTab, setActiveTab] = useState<CourseTab>("overview");
  const [showPreview, setShowPreview] = useState(false);
  const shareCourse = useCallback(async () => {
    const url = window.location.href;

    try {
      if (navigator.share && course) {
        await navigator.share({
          title: course.title,
          text: `Check out ${course.title}`,
          url,
        });
        toast.success("Share dialog opened");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        toast.success("Course link copied to clipboard");
        return;
      }

      window.prompt("Copy this course link", url);
    } catch (error) {
      const errMessage = getErrorMessage(error);
      toast.error(
        errMessage ?? "Unable to share the course link. Please try again.",
      );
    }
  }, [course]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-semibold">Course not found</h2>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          The course you are looking for does not exist or is no longer
          available.
        </p>
      </div>
    );
  }

  const isFree = Number(course.price) === 0;

  const tabs: { label: string; value: CourseTab }[] = [
    { label: "Overview", value: "overview" },
    { label: "Curriculum", value: "curriculum" },
    { label: "Instructor", value: "instructor" },
    { label: "Reviews", value: "reviews" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Explore Courses</span>
          <span>/</span>
          <span>Course</span>
          <span>/</span>
          <span className="font-medium text-foreground">{course.title}</span>
        </nav>
        <div className="w-[80vw] flex justify-end mb-5">
          <BackBtn />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <main className="min-w-0 space-y-8">
            <section className="overflow-hidden rounded-2xl border bg-card">
              <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
                <div className="relative min-h-60 bg-muted lg:min-h-full">
                  <Image
                    src={course.thumbnail || "/placeholder-course.jpg"}
                    alt={course.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium capitalize text-emerald-500">
                      {course.level}
                    </span>

                    <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium">
                      {isFree ? "Free" : `$${Number(course.price).toFixed(2)}`}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {course.title}
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">
                        {Number(course.averageRating).toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="size-4" />
                      <span>
                        {course.totalStudents.toLocaleString()} students
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Award className="size-4" />
                      <span>Certificate included</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t pt-5 text-sm text-muted-foreground">
                    <CourseMeta
                      icon={<Clock3 className="size-4" />}
                      value={formatDuration(course.duration)}
                    />

                    <CourseMeta
                      icon={<BookOpen className="size-4" />}
                      value={`${course.lessonsCount} lessons`}
                    />

                    <CourseMeta
                      icon={<BarChart3 className="size-4" />}
                      value={course.level}
                    />

                    <CourseMeta
                      icon={<Globe2 className="size-4" />}
                      value={course.language}
                    />
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <EnrollmentButton courseId={id} className="gap-2 px-6" />

                    {!isPreviewLessonsLoading &&
                      previewLessons &&
                      previewLessons.count > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          className="gap-2"
                          onClick={() => setShowPreview((prev) => !prev)}
                        >
                          <Play className="size-4" />

                          {showPreview ? "Hide Preview" : "Preview Course"}
                        </Button>
                      )}

                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      aria-label="Share course"
                      onClick={shareCourse}
                    >
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {showPreview && previewLessons && previewLessons.count > 0 && (
              <CoursePreviewLessons lessons={previewLessons.lessons} />
            )}

            <div className="overflow-x-auto border-b">
              <div className="flex min-w-max gap-7">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={`relative pb-3 text-sm font-medium transition ${
                      activeTab === tab.value
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}

                    {activeTab === tab.value && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-8">
                <section className="rounded-2xl border bg-card p-6 sm:p-8">
                  <h2 className="text-xl font-semibold">
                    What you&apos;ll learn
                  </h2>

                  <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {[
                      "Understand the core concepts covered in this course",
                      "Apply what you learn through practical examples",
                      "Build stronger foundations for advanced topics",
                      "Use modern workflows and best practices",
                      "Complete lessons and assessments at your own pace",
                      "Earn a certificate after completing the course",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        <span className="leading-6 text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid gap-6 md:grid-cols-2">
                  <section className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold">Prerequisites</h3>

                    <div className="mt-5 space-y-3">
                      {[
                        "Basic computer knowledge",
                        "A computer with internet access",
                        "No advanced experience required",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold">Course highlights</h3>

                    <div className="mt-5 space-y-3">
                      {[
                        "Practical course content",
                        `${course.lessonsCount} structured lessons`,
                        "Quiz assessments",
                        "Certificate of completion",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <section className="border-2 p-2 rounded-md">
                  <h2 className="text-xl font-semibold">About this course</h2>

                  <p className="mt-4 max-w-4xl whitespace-pre-line text-sm leading-7 text-muted-foreground">
                    {course.description}
                  </p>
                </section>
              </div>
            )}

            {activeTab === "curriculum" && (
              <section className="rounded-2xl border bg-card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Course curriculum</h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {course.lessonsCount} lessons ·{" "}
                      {formatDuration(course.duration)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                  Curriculum content goes here.
                </div>
              </section>
            )}

            {activeTab === "instructor" && (
              <section className="rounded-2xl border bg-card p-6 sm:p-8">
                <h2 className="text-xl font-semibold">Instructor</h2>

                <p className="mt-3 text-sm text-muted-foreground">
                  Instructor information goes here.
                </p>
              </section>
            )}

            {activeTab === "reviews" && (
              <section className="rounded-2xl border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold">
                    {Number(course.averageRating).toFixed(1)}
                  </div>

                  <div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="size-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Course rating
                    </p>
                  </div>
                </div>
              </section>
            )}
          </main>

          <aside className="lg:relative">
            <div className="space-y-5 rounded-2xl border bg-card p-6 lg:sticky lg:top-6">
              <div>
                <p className="text-sm text-muted-foreground">Course access</p>

                <p className="mt-1 text-3xl font-bold">
                  {isFree ? "Free" : `$${Number(course.price).toFixed(2)}`}
                </p>
              </div>

              <EnrollmentButton
                courseId={id}
                size="lg"
                className="w-full gap-2"
              />

              <div className="border-t pt-5">
                <p className="mb-4 text-sm font-medium">This course includes</p>

                <div className="space-y-4">
                  <SidebarDetail
                    icon={<Clock3 />}
                    label="Duration"
                    value={formatDuration(course.duration)}
                  />

                  <SidebarDetail
                    icon={<BookOpen />}
                    label="Lessons"
                    value={String(course.lessonsCount)}
                  />

                  <SidebarDetail
                    icon={<BarChart3 />}
                    label="Level"
                    value={course.level}
                  />

                  <SidebarDetail
                    icon={<Globe2 />}
                    label="Language"
                    value={course.language}
                  />

                  <SidebarDetail
                    icon={<Award />}
                    label="Certificate"
                    value="Included"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-muted/60 p-4">
                <div className="flex items-start gap-3">
                  <Award className="mt-0.5 size-5 shrink-0 text-primary" />

                  <div>
                    <p className="text-sm font-medium">Certificate included</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Complete all required lessons and quizzes to earn your
                      certificate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function CourseMeta({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="capitalize">{value}</span>
    </div>
  );
}

function SidebarDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="[&>svg]:size-4">{icon}</span>
        <span>{label}</span>
      </div>

      <span className="max-w-35 truncate text-right font-medium capitalize">
        {value}
      </span>
    </div>
  );
}
