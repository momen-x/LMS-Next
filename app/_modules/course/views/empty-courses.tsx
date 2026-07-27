import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";

interface EmptyCoursesProps {
  onCreateCourse?: () => void;
}

export default function EmptyCourses({ onCreateCourse }: EmptyCoursesProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-100 w-full rounded-xl border border-dashed border-border bg-card/50 text-card-foreground transition-colors duration-300">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl dark:bg-primary/20" />

          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
            <GraduationCap className="w-12 h-12 stroke-[1.5]" />
            <div className="absolute bottom-3 right-3 bg-background border border-border rounded-full p-1 shadow-sm">
              <Plus className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            No Courses Found
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You haven&apos;t created any courses yet.
            <br />
            Start by creating your first course.
          </p>
        </div>

        <div className="pt-2">
          <Button
            onClick={onCreateCourse}
            className="gap-2 px-6 shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Course
          </Button>
        </div>
      </div>
    </div>
  );
}
