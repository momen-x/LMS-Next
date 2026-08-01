"use client";

import Image from "next/image";
import {
  Users,
  BookOpen,
  Clock,
  BarChart,
  Globe,
  Star,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import defaultCourseImage from "@/public/assets/default-course.png";
import { useGetCourse } from "../hooks/useGetCourse";
import BackBtn from "@/components/sharing/back-btn";
import Link from "next/link";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";
import NoData from "@/components/sharing/no-data";
import { useSubmitCourseForReview } from "../hooks/useSubmitCourseForReview";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/get-axios-error-message";

interface CourseDetailsProps {
  onEdit: string;
  onDelete: string;
  courseId: string;
  manageSections: string;
  viewStudents: string;
}

export default function CourseDetails({
  onEdit,
  onDelete,
  courseId,
  manageSections,
  viewStudents,
}: CourseDetailsProps) {
  const formatDuration = (minutes: number = 0) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  const {
    data: course,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetCourse(courseId);
  const { mutate: submitCourseForReview, isPending } =
    useSubmitCourseForReview();

  if (isLoading) {
    return <CardSkeleton />;
  }
  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load Course Details"
        description="We couldn’t load the course details. Please try again"
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }
  if (!course) {
    return <NoData />;
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Courses</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-foreground">{course.title}</span>
          </div>
          <BackBtn />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-2">
                Actions
                <ChevronRight className="w-4 h-4 rotate-90" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuLinkItem className="text-primary" href={onEdit}>
              Edit Course
            </DropdownMenuLinkItem>
            <DropdownMenuLinkItem className="text-destructive" href={onDelete}>
              Delete Course
            </DropdownMenuLinkItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Course Hero Banner */}
      <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative w-full md:w-64 h-36 rounded-xl overflow-hidden bg-muted shrink-0 border">
          <Image
            src={course.thumbnail || defaultCourseImage}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-3 flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            {course.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap pt-1">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                course.status === "published"
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  : course.status === "draft"
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    : course.status === "pending_review"
                      ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      : "bg-gray-500/10 text-gray-500 border border-gray-500/20"
              }`}
            >
              {capitalize(course.status)}
            </span>
            {course.status === "draft" && (
              <Button
                className="text-sm"
                variant="default"
                size="sm"
                onClick={() =>
                  submitCourseForReview(course.id, {
                    onSuccess: () => {
                      toast.success("Course submitted for review successfully");
                    },
                    onError: (err) => {
                      const errMessage = getErrorMessage(err);
                      toast.error(
                        errMessage ??
                          "Something went wrong, failed to submit course for review",
                      );
                    },
                  })
                }
                disabled={isPending}
              >
                Submit for Review
              </Button>
            )}

            <span className="bg-muted px-2.5 py-0.5 rounded-md text-xs font-semibold text-foreground border">
              ${course.price?.toFixed(2) ?? "0.00"}
            </span>

            <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{course.averageRating ?? 0}</span>
              <span className="text-muted-foreground font-normal">
                {/* todo */}
                (not found reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Students */}
        <div className="bg-card border rounded-xl p-4 flex items-center gap-3 shadow-sm">
          <div className="p-2.5 bg-muted rounded-lg text-muted-foreground">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Students
            </p>
            <p className="text-lg font-bold">{course.totalStudents ?? 0}</p>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-4 flex items-center gap-3 shadow-sm">
          <div className="p-2.5 bg-muted rounded-lg text-muted-foreground">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Lessons</p>
            <p className="text-lg font-bold">{course.lessonsCount ?? 0}</p>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-4 flex items-center gap-3 shadow-sm">
          <div className="p-2.5 bg-muted rounded-lg text-muted-foreground">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Duration
            </p>
            <p className="text-lg font-bold">
              {formatDuration(course.duration)}
            </p>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-4 flex items-center gap-3 shadow-sm">
          <div className="p-2.5 bg-muted rounded-lg text-muted-foreground">
            <BarChart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Level</p>
            <p className="text-lg font-bold">{capitalize(course.level)}</p>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-4 flex items-center gap-3 shadow-sm col-span-2 sm:col-span-1">
          <div className="p-2.5 bg-muted rounded-lg text-muted-foreground">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Language
            </p>
            <p className="text-lg font-bold">{capitalize(course.language)}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-6">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="curriculum"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground"
          >
            Curriculum
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground"
          >
            Students
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 font-semibold text-muted-foreground data-[state=active]:text-foreground"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-semibold">About this course</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {course.description || "No description provided."}
              </p>
            </div>

            <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <div className="h-32 flex flex-col justify-center items-center rounded-xl shadow-sm">
                <Link href={manageSections} className="mb-5">
                  <Button className="w-full justify-start" variant="outline">
                    Manage Sections
                  </Button>
                </Link>
                <Link href={viewStudents}>
                  <Button className="w-full justify-start" variant="outline">
                    View Student List
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="curriculum">
          <div className="bg-card border rounded-2xl p-6 shadow-sm text-center text-muted-foreground py-12">
            Curriculum content goes here...
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="bg-card border rounded-2xl p-6 shadow-sm text-center text-muted-foreground py-12">
            Enrolled students list goes here...
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="bg-card border rounded-2xl p-6 shadow-sm text-center text-muted-foreground py-12">
            Course reviews & feedback go here...
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="bg-card border rounded-2xl p-6 shadow-sm text-center text-muted-foreground py-12">
            Course analytics & sales data go here...
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="bg-card border rounded-2xl p-6 shadow-sm text-center text-muted-foreground py-12">
            Course settings go here...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
