"use client";

import { CalendarDays, CheckCircle2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import type { Enrollment } from "../entity/enrollment";

type EnrollmentListItemProps = {
  enrollment: Enrollment;
};

export default function EnrollmentListItem({
  enrollment,
}: EnrollmentListItemProps) {
  const progress = Math.min(Math.max(enrollment.progress, 0), 100);

  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4 lg:flex-row lg:items-center">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-medium">
            User ID: {enrollment.studentId}
          </h3>

          {enrollment.completed && (
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
              <CheckCircle2 className="size-3.5" />
              Completed
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />

          <span>
            Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString()}
          </span>
        </div>

        <div className="max-w-xl space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>

          <Progress value={progress} />
        </div>
      </div>

      <Button type="button" variant="destructive" size="sm">
        <Trash2 className="size-4" />
        Remove
      </Button>
    </div>
  );
}
