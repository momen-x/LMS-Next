"use client";

import { useState } from "react";
import { Course, CourseLevel } from "../entity/course";
import { useGetAllCategories } from "../../category/hooks/useGetAllCategories";
import { useSearchCourses } from "../hooks/useSearchCourses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { childrenPropsType } from "@/types/children-type";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";
import { CourseCard } from "./course-card";

const CoursePageView = ({ children }: childrenPropsType) => {
  const [level, setLevel] = useState<CourseLevel | undefined>(undefined);
  const [priceType, setPriceType] = useState<"all" | "free" | "premium">("all");
  //   const [sortBy, setSortBy] = useState<string>("newest");
  const [category, setCategory] = useState<string>("all");
  

  const { data: categories } = useGetAllCategories();

  const minPrice = priceType === "premium" ? 0.01 : undefined;
  const maxPrice = priceType === "free" ? 0 : undefined;

  // Query Courses
  const { data, isLoading, isError, refetch, isFetching } = useSearchCourses({
    page: 1,
    limit: 12,
    category: category === "all" ? undefined : category,
    level,
    maxPrice: maxPrice,
    minPrice: minPrice,
  });

  const courses: Course[] = data?.courses || [];

  // Filter client side for "premium" if backend doesn't support price ranges directly
  const filteredCourses = courses.filter((c) => {
    if (priceType === "premium") return c.price > 0;
    return true;
  });
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 m-auto">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Category
            </span>
            <Select
              value={category || "all"}
              onValueChange={(v) => setCategory(v ?? "all")}
            >
              <SelectTrigger className="h-9 w-37.5 text-xs">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories && categories.length > 0 ? (
                  <>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Level Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Level
            </span>
            <Select
              value={level || "all"}
              onValueChange={(v) =>
                setLevel(v === "all" ? undefined : (v as CourseLevel))
              }
            >
              <SelectTrigger className="h-9 w-32.5 text-xs">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Filter Pills */}
          <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-1">
            <span className="px-2 text-xs font-medium text-muted-foreground">
              Price
            </span>
            <Button
              variant={priceType === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceType("all")}
              className="h-7 text-xs px-3"
            >
              All
            </Button>
            <Button
              variant={priceType === "free" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceType("free")}
              className="h-7 text-xs px-3"
            >
              Free
            </Button>
            <Button
              variant={priceType === "premium" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceType("premium")}
              className="h-7 text-xs px-3"
            >
              Premium
            </Button>
          </div>
        </div>
      </div>
      {children}
      <div className="mt-5 mb-5 ml-4">
        {isLoading ? (
          <ListSkeleton />
        ) : isError ? (
          <QueryErrorState
            isRetrying={isFetching}
            onRetry={refetch}
            description="Error to load the courses"
          />
        ) : filteredCourses.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No courses found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {filteredCourses.map((course) => (
            
              <CourseCard key={course.id} course={course}  />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePageView;
