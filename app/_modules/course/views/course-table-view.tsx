"use client";

import Image from "next/image";
import { MoreVertical } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Course, CourseStatus } from "../entities/course";
import defaultCourseImage from "@/public/assets/default-course.png";

type CoursesTableViewProps = {
  courses: Course[];
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
  showInstructorColumn?: boolean;
  onView?: (course: Course) => void;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
};

export function CoursesTableView({
  courses,
  isLoading,
  emptyMessage = "No courses found.",
  showInstructorColumn = true,
  onView,
  onEdit,
  onDelete,
}: CoursesTableViewProps) {
  const columnCount = showInstructorColumn ? 6 : 5;

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="flex justify-end mt-4 mb-5"></div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Course</TableHead>
            {showInstructorColumn && (
              <TableHead className="font-semibold">Instructor</TableHead>
            )}
            <TableHead className="font-semibold">Students</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={columnCount}>
                  <div className="h-10 animate-pulse rounded bg-muted" />
                </TableCell>
              </TableRow>
            ))
          ) : courses.length > 0 ? (
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

                {showInstructorColumn && (
                  <TableCell className="text-muted-foreground">
                    {course.instructorId}
                  </TableCell>
                )}

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
                      <DropdownMenuItem onClick={() => onView?.(course)}>
                        View Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(course)}>
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onDelete?.(course)}
                      >
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
                colSpan={columnCount}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
