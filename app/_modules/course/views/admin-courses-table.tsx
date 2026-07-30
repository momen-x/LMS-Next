"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSearchCourses } from "../hooks/useSearchCourses";
import { useGetAllCategories } from "../../category/hooks/useGetAllCategories";
import { Course, CourseLevel } from "../entity/course";
import { CoursesTableView } from "./course-table-view";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LEVEL_OPTIONS: { label: string; value: CourseLevel | undefined }[] = [
  { label: "All Levels", value: undefined },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

export default function AdminCoursesTable() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [appliedCategory, setAppliedCategory] = useState<string | undefined>();

  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | undefined>();
  const [appliedLevel, setAppliedLevel] = useState<CourseLevel | undefined>();

  const { data: categories } = useGetAllCategories();

  const { data, isLoading } = useSearchCourses({
    page,
    limit: 10,
    category: appliedCategory,
    level: appliedLevel,
  });

  const courses = data?.courses ?? [];
  const meta = data?.meta;

  const activeLevelLabel =
    LEVEL_OPTIONS.find((option) => option.value === selectedLevel)?.label ??
    "All Levels";

  const activeCategoryLabel =
    categories?.find((cat) => cat.id === selectedCategory)?.name ??
    "All Categories";

  const handleApplyFilters = () => {
    setAppliedCategory(selectedCategory);
    setAppliedLevel(selectedLevel);
    setPage(1);
  };

  const goToPreviousPage = () => {
    if (meta?.hasPreviousPage) setPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    if (meta?.hasNextPage) setPage((prev) => prev + 1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-sm text-muted-foreground">
            Manage all courses on the platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Link href="/admin-dashboard/courses/create">
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleApplyFilters}
          >
            <Filter className="w-4 h-4" />
            Apply
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" className="gap-2" />}
            >
              {activeCategoryLabel}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedCategory(undefined)}>
                All Categories
              </DropdownMenuItem>
              {categories?.map((cat) => (
                <DropdownMenuItem
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={
                    cat.id === selectedCategory
                      ? "font-semibold text-blue-600 dark:text-blue-400"
                      : ""
                  }
                >
                  {cat.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" className="gap-2" />}
            >
              {activeLevelLabel}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LEVEL_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  onClick={() => setSelectedLevel(option.value)}
                  className={
                    option.value === selectedLevel
                      ? "font-semibold text-blue-600 dark:text-blue-400"
                      : ""
                  }
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CoursesTableView
        courses={courses}
        isLoading={isLoading}
        showInstructorColumn
        emptyMessage="No courses found."
        onView={(course: Course) => router.push(`courses/${course.id}/course`)}
        onEdit={(course: Course) => router.push(`courses/${course.id}/update`)}
        onDelete={(course: Course) =>
          router.push(`courses/${course.id}/delete`)
        }
      />

      {meta && (
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20 rounded-b-xl -mt-6">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!meta.hasPreviousPage}
              onClick={goToPreviousPage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-3 text-sm text-muted-foreground">
              Page {meta.page} of {meta.totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!meta.hasNextPage}
              onClick={goToNextPage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
