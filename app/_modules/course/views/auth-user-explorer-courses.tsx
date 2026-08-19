"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Clock,
  Award,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useGetAllCourses } from "../hooks/useGetAllCourses";

import CoursePageView from "./course-page-view";
import { useGetAllCategories } from "../../category/hooks/useGetAllCategories";
import { useGetHighRatingCourses } from "../hooks/useGetHighRatingCourses";
import { formatDuration } from "@/utils/format-duration";

export default function ExploreCourses() {
  const { data: categories } = useGetAllCategories();
  const { data: coursesData } = useGetAllCourses(1, 5);
  const { data: course } = useGetHighRatingCourses(1);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Explore Courses
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Discover free and premium courses to grow your skills.
        </p>
      </div>

      <CoursePageView>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 mt-5 mb-5">
          {/* Left / Center Main Area */}
          {course && course.length > 0 && (
            <div className="space-y-8 lg:col-span-3">
              {/* Featured Hero Banner */}
              <div className="relative overflow-hidden rounded-2xl border bg-linear-to-r from-blue-50/80 via-indigo-50/50 to-background dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-background p-6 md:p-8">
                <div className="grid items-center gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <Badge className="bg-blue-600/10 text-blue-600 dark:bg-blue-400/20 dark:text-blue-300 hover:bg-blue-600/10 border-0 gap-1.5 px-3 py-1 font-semibold text-xs">
                      <Sparkles className="size-3.5 fill-blue-600 dark:fill-blue-300" />
                      Featured Course
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                      {course[0].title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course[0].description}
                    </p>

                    <div className="space-y-2 pt-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-500" />
                        <span>{course[0].level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-blue-500" />
                        <span>
                          {course[0].duration * 60 > 0
                            ? formatDuration(course[0].duration)
                            : "+10 hours"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="size-4 text-amber-500" />
                        <span>Certificate Included</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-foreground">
                        {course[0].averageRating}
                      </span>
                      <span className="text-muted-foreground">
                        ({course[0].totalStudents})
                      </span>
                    </div>
                    {/* todo create this course and this page */}
                    <Link href={`/student-dashboard/courses/id`}>
                      <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                        Explore featured course
                        <ChevronRight className="size-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Banner Mockup Image */}
                  <div className="relative flex justify-center">
                    <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden shadow-lg border">
                      {course[0].thumbnail && (
                        <Image
                          src={course[0].thumbnail}
                          alt="Featured Course"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Popular Categories */}
            <div className="rounded-xl border bg-card p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Popular Categories</h3>
              </div>

              <div className="space-y-2">
                {categories &&
                  categories.length > 0 &&
                  categories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center ">
                        <div className="flex items-center gap-3"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {cat.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {cat.slug}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Newest on the platform */}
            <div className="rounded-xl border bg-card p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">
                  Newest on the platform
                </h3>
                <Link
                  href="/courses?sort=newest"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {coursesData &&
                  coursesData.length > 0 &&
                  coursesData.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="size-8 rounded-md bg-muted shrink-0 flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {course.title[0].toUpperCase()}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-medium text-foreground truncate">
                            {course.title}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-900/50"
                      >
                        New
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </CoursePageView>
    </div>
  );
}
