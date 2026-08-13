"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Award,
  ChevronRight,
  Flame,
  Quote,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Certificate } from "../../certificate/entity/certificate";
import { useGetUserEnrollmentStats } from "../../enrollment/hooks/useGetUserEnrollmentStats";
import { useGetMyEnrollments } from "../../enrollment/hooks/useGetMyEnrollments";
import { useGetMyCertificates } from "../../certificate/hooks/useGetMyCertificates";
import CertificateCard from "../../certificate/views/certificate-card";

// Hooks

export default function StudentDashboardView() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // 1. Fetch Stats
  const { data: stats, isLoading: isStatsLoading } =
    useGetUserEnrollmentStats();

  // 2. Fetch Active Enrollments
  const { data: enrollments = [], isLoading: isEnrollmentsLoading } =
    useGetMyEnrollments();

  // 3. Fetch Certificates
  const { data: certificates = [], isLoading: isCertificatesLoading } =
    useGetMyCertificates();

  // Pick top 3 last accessed/in-progress courses for "Continue Learning"
  const inProgressCourses = enrollments
    .filter((e) => (e.progress ?? 0) < 100)
    .slice(0, 3);

  // Last course for top hero button
  const latestCourse = inProgressCourses[0] || enrollments[0];

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      {/* Top Banner & Main Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column (Main Dashboard Content) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Welcome Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl border bg-linear-to-r from-blue-50/80 via-indigo-50/40 to-background dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-background p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                  Welcome back, keep learning 👋
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every lesson brings you closer to your goals. Stay consistent
                  and keep growing!
                </p>
                <div className="pt-2">
                  {latestCourse ? (
                    <Link href={`/student-dashboard/courses`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 text-xs font-medium h-9 px-4">
                        Continue learning
                        <ChevronRight className="size-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/courses">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 text-xs font-medium h-9 px-4">
                        {enrollments.length > 0
                          ? "Continue Learning"
                          : "Explore Courses"}{" "}
                        <ChevronRight className="size-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Banner Illustration */}
              <div className="relative size-32 hidden sm:block shrink-0">
                <Image
                  src="/illustrations/books.png" // Use your asset path or fallback
                  alt="Learning"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // Fallback visually if image is missing
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Enrolled Courses */}
            <Card className="border bg-card shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <BookOpen className="size-5" />
                  </div>
                  <div>
                    {isStatsLoading ? (
                      <Skeleton className="h-6 w-8" />
                    ) : (
                      <p className="text-2xl font-bold text-foreground">
                        {stats?.totalCourses ?? enrollments.length}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Enrolled Courses
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    You&apos;re making progress!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Completed Courses */}
            <Card className="border bg-card shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    {isStatsLoading ? (
                      <Skeleton className="h-6 w-8" />
                    ) : (
                      <p className="text-2xl font-bold text-foreground">
                        {stats?.completedCourses ?? 0}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Completed Courses
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Great job!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* In Progress */}
            <Card className="border bg-card shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    {isStatsLoading ? (
                      <Skeleton className="h-6 w-8" />
                    ) : (
                      <p className="text-2xl font-bold text-foreground">
                        {stats?.inProgressCourses ?? inProgressCourses.length}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    In Progress
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Keep it up!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Certificates Earned */}
            <Card className="border bg-card shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Award className="size-5" />
                  </div>
                  <div>
                    {isCertificatesLoading ? (
                      <Skeleton className="h-6 w-8" />
                    ) : (
                      <p className="text-2xl font-bold text-foreground">
                        {certificates.length}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Certificates Earned
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Keep learning!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Continue Learning Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Continue Learning
              </h2>
              <Link
                href="/student-dashboard/courses"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View all
              </Link>
            </div>

            {isEnrollmentsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-xl" />
                ))}
              </div>
            ) : inProgressCourses.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <p className="text-sm text-muted-foreground">
                  You don&apos;t have any active courses right now.
                </p>
                <Link href="/courses">
                  <Button size="sm" className="mt-3 text-xs">
                    Browse Catalog
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {inProgressCourses.map((enrollment) => {
                  const progressValue = Math.round(enrollment.progress ?? 0);

                  return (
                    <Card
                      key={enrollment.id}
                      className="overflow-hidden border bg-card shadow-sm flex flex-col justify-between group"
                    >
                      <div>
                        {/* Course Thumbnail */}
                        <div className="relative aspect-video w-full bg-muted overflow-hidden">
                          <Image
                            src={
                              enrollment.course.thumbnail ||
                              "/placeholder-course.png"
                            }
                            alt={enrollment.course.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2">
                            <span className="bg-background/90 text-foreground backdrop-blur-md text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                              {progressValue}%
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-3.5 space-y-3">
                          <div className="flex items-start justify-between gap-1">
                            <h3
                              className="font-semibold text-sm line-clamp-1 text-foreground"
                              title={enrollment.course.title}
                            >
                              {enrollment.course.title}
                            </h3>
                            <button className="text-muted-foreground hover:text-foreground">
                              <MoreVertical className="size-4" />
                            </button>
                          </div>

                          {/* Instructor */}
                          {enrollment.course.instructor && (
                            <div className="flex items-center gap-2">
                              <Avatar className="size-5">
                                <AvatarImage
                                  src={
                                    enrollment.course.instructor.avatar || ""
                                  }
                                />
                                <AvatarFallback className="text-[9px]">
                                  {enrollment.course.instructor.name?.[0] ||
                                    "I"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground truncate">
                                {enrollment.course.instructor.name}
                              </span>
                            </div>
                          )}

                          {/* Progress Bar */}
                          <div className="space-y-1 pt-1">
                            <Progress value={progressValue} className="h-1.5" />
                            <p className="text-[10px] text-muted-foreground font-medium">
                              {progressValue}% complete
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="p-3.5 pt-0">
                        <Link href={`/courses/${enrollment.courseId}/learning`}>
                          <Button
                            size="sm"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 gap-1"
                          >
                            Continue
                            <ChevronRight className="size-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Motivational Quote Banner */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Quote className="size-6 text-blue-500/40" />
              <p className="text-xs sm:text-sm font-medium text-foreground italic">
                &quot;The beautiful thing about learning is that no one can take
                it away from you.&quot;
              </p>
              <p className="text-[11px] text-muted-foreground font-semibold">
                — B.B. King
              </p>
            </div>
            <div className="relative size-16 shrink-0 hidden sm:block">
              <Award className="size-12 text-blue-500/20 absolute inset-0 m-auto" />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Learning Streak */}
          <div className="rounded-xl border bg-card p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="size-5 text-amber-500 fill-amber-500" />
                <h3 className="font-semibold text-sm">Learning Streak</h3>
              </div>
              <span className="text-xs font-bold text-foreground">7 days</span>
            </div>

            {/* <p className="text-xs text-muted-foreground">Keep it going! 🔥</p> */}
            <p className="text-xs text-muted-foreground">Coming soon ⏳</p>

            {/* Days Circle Strip */}
            {/* <div className="flex items-center justify-between pt-1">
              {["M", "T", "W", "T", "F"].map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div className="flex size-7 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check className="size-3.5" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {day}
                  </span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-1">
                <div className="flex size-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
                  <Flame className="size-3.5 fill-white" />
                </div>
                <span className="text-[10px] font-bold text-foreground">S</span>
              </div>
            </div> */}
          </div>

          {/* Recent Certificates */}
          {certificates.length > 0 && (
            <div className="rounded-xl border bg-card p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Recent Certificates</h3>
                <Link
                  href="/student-dashboard/certificates"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  View all
                </Link>
              </div>

              {isCertificatesLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
              ) : certificates.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No certificates earned yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {certificates.slice(0, 2).map((cert) => (
                    <CertificateCard
                      key={cert.id}
                      certificate={cert}
                      onPreview={(certificate) => setSelectedCert(certificate)}
                    />
                  ))}
                </div>
              )}

              <div className="pt-2 border-t text-center">
                <Link
                  href="/student-dashboard/certificates"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium"
                >
                  View all certificates
                  <ChevronRight className="size-3" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Preview Dialog */}
      <Dialog
        open={!!selectedCert}
        onOpenChange={(open) => !open && setSelectedCert(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          {selectedCert && (
            <div className="p-4 space-y-3 border rounded-lg bg-muted/20 text-center">
              <Award className="size-12 text-primary mx-auto" />
              <h3 className="font-bold text-base">Certificate of Completion</h3>
              <p className="text-xs text-muted-foreground">
                Number: {selectedCert.certificateNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                Issued on:{" "}
                {new Date(selectedCert.issueDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
