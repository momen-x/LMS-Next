"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSearchCourses } from "../hooks/useSearchCourses";
import { useGetAllCategories } from "../../category/hooks/useGetAllCategories";
import { CourseLevel, CourseStatus } from "../entity/course";
import defaultCourseImage from "@/public/assets/default-user1.png";

const LEVEL_OPTIONS: { label: string; value: CourseLevel | undefined }[] = [
  { label: "All Levels", value: undefined },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

export default function CoursesTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [appliedCategory, setAppliedCategory] = useState<string | undefined>();

  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | undefined>();
  const [appliedLevel, setAppliedLevel] = useState<CourseLevel | undefined>();

  const {
    data: categories,
    isError,
  } = useGetAllCategories();

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

  if (isLoading) {
    // todo create skeleton component
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Failed to load courses.</div>;
  }
  if (!data) {
    return <div>No courses found</div>;
  }

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
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Course
          </Button>
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
            Filter
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

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold">Instructor</TableHead>
              <TableHead className="font-semibold">Students</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <TableRow
                  key={course.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium flex items-center gap-3 py-3">
                    <Image
                      src={course.thumbnail || defaultCourseImage}
                      alt={course.title}
                      className="w-10 h-10 rounded-md object-cover border"
                      width={40}
                      height={40}
                    />
                    <span className="font-semibold">{course.title}</span>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {course.instructorId || "Instructor"}
                  </TableCell>

                  <TableCell>{course.totalStudents ?? 0}</TableCell>

                  <TableCell>${course.price?.toFixed(2) ?? "0.00"}</TableCell>

                  <TableCell>
                    <StatusBadge status={course.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          />
                        }
                      >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Course</DropdownMenuItem>
                        <DropdownMenuItem>Edit Course</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {meta && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
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
    </div>
  );
}

function StatusBadge({ status }: { status: CourseStatus }) {
  switch (status) {
    case "published":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          Published
        </span>
      );
    case "draft":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
          Draft
        </span>
      );
    case "archived":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">
          Archived
        </span>
      );
    default:
      return null;
  }
}
