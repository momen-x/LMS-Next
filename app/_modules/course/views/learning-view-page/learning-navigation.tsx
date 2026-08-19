"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CourseLearning } from "../../entities/course-learning";

type LearningLesson = CourseLearning["sections"][number]["lessons"][number];

interface LearningNavigationProps {
  previousLesson: LearningLesson | null;
  nextLesson: LearningLesson | null;
  onPrevious: () => void;
  onNext: () => void;
  isCompleting: boolean;
  isLastRemainingUncompletedLesson: boolean;
}

export default function LearningNavigation({
  previousLesson,
  nextLesson,
  onPrevious,
  onNext,
  isCompleting,
  isLastRemainingUncompletedLesson,
}: LearningNavigationProps) {
  return (
    <div className="border-t">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-4 py-5 sm:gap-4 sm:px-6 sm:py-6 lg:px-10">
        <Button
          type="button"
          variant="outline"
          disabled={!previousLesson}
          onClick={onPrevious}
          className="gap-1.5 sm:gap-2"
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <Button
          type="button"
          disabled={
            (!nextLesson && !isLastRemainingUncompletedLesson) || isCompleting
          }
          onClick={onNext}
          className="gap-1.5 sm:gap-2"
        >
          {isCompleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              {isLastRemainingUncompletedLesson ? "Complete Lessons" : "Next"}
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
