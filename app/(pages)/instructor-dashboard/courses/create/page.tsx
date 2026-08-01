import type { Metadata } from "next";
import {
  BookOpenCheck,
  CheckCircle2,
  FileVideo2,
  ImageIcon,
  Info,
  Layers3,
  UserRoundCheck,
} from "lucide-react";

import CourseForm from "@/app/_modules/course/views/create-update-course";

export const metadata: Metadata = {
  title: "Create New Course",
  description: "Create a new course and prepare it for admin review.",
};

const courseRequirements = [
  {
    title: "Course thumbnail",
    description: "Upload a clear thumbnail that represents the course content.",
    icon: ImageIcon,
  },
  {
    title: "At least one section",
    description:
      "Organize the course content into at least one structured section.",
    icon: Layers3,
  },
  {
    title: "At least one lesson",
    description:
      "Every course must contain at least one lesson before submission.",
    icon: BookOpenCheck,
  },
  {
    title: "Lesson media",
    description:
      "Add the required video, audio, or document content to the lessons.",
    icon: FileVideo2,
  },
  {
    title: "Valid instructor and category",
    description:
      "The course must belong to a valid instructor and an existing category.",
    icon: UserRoundCheck,
  },
];

const CreateCoursePage = () => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 md:px-6">
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="border-b bg-muted/20 p-5 md:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Info className="size-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                Course publishing requirements
              </h1>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                The course will first be created as a draft. Complete the
                following requirements before submitting it to the administrator
                for review and publishing.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 md:p-6 lg:grid-cols-3">
          {courseRequirements.map((requirement) => {
            const Icon = requirement.icon;

            return (
              <article
                key={requirement.title}
                className="flex items-start gap-3 rounded-xl border bg-background p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Icon className="size-4" />
                </div>

                <div>
                  <h2 className="flex items-center gap-1.5 text-sm font-semibold">
                    {requirement.title}
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {requirement.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="border-t bg-amber-500/5 px-5 py-3 text-xs leading-5 text-muted-foreground md:px-6">
          Creating the course does not publish it immediately. You can continue
          adding sections, lessons, media, and quizzes while the course remains
          in draft status.
        </div>
      </section>

      <CourseForm onCancel="/instructor-dashboard/courses" />
    </div>
  );
};

export default CreateCoursePage;
