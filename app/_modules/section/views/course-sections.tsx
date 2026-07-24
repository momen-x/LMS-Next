"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useGetCourseSections } from "../hooks/useGetCourseSections";
import SectionCard from "./section-card";

interface CourseSectionsProps {
  courseId: string;
}

export default function CourseSections({ courseId }: CourseSectionsProps) {
  const { data: sections, isLoading, isError } = useGetCourseSections(courseId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Loading sections...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-destructive">
            Failed to load course sections.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Course Curriculum</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Organize the course content into sections.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 size-4" />
          Add Section
        </Button>
      </CardHeader>

      <CardContent>
        {!sections?.length ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="font-medium">No sections yet</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Add the first section to start building the course curriculum.
            </p>

            <Button className="mt-4">
              <Plus className="mr-2 size-4" />
              Add First Section
            </Button>
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
  );
}
