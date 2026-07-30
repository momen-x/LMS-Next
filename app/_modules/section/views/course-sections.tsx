"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LessonDialogProvider } from "../../lesson/context/lesson-dialog-context";
import SectionCard from "./section-card";
import CreateSection from "./create-section";

import { useGetCourseSections } from "../hooks/useGetCourseSections";
import BackBtn from "@/components/sharing/back-btn";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";

interface CourseSectionsProps {
  courseId: string;
}

export default function CourseSections({ courseId }: CourseSectionsProps) {
  const {
    data: sections,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetCourseSections(courseId);

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load Sections"
        description="We couldn’t load the sections in this course."
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <LessonDialogProvider>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Course Curriculum</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Organize the course content into sections.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <BackBtn className="mt-1.5" />
            <CreateSection courseId={courseId} />
          </div>
        </CardHeader>

        <CardContent>
          {!sections?.length ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="font-medium">No sections yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add the first section to start building the course curriculum.
              </p>
              <CreateSection courseId={courseId} title="Create First Section" />
            </div>
          ) : (
            <div className="space-y-3">
              {[...sections]
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <SectionCard key={section.id} section={section} />
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </LessonDialogProvider>
  );
}
