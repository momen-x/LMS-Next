import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ContinueLearning from "./continue-learning-btn";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <div className="mx-auto grid min-h-155 w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground">
            <GraduationCap className="size-4 text-primary" />
            Learn at your own pace
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Learn new skills.
            <span className="block text-primary">Build your future.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Explore structured courses, learn through practical lessons, test
            your knowledge with quizzes, track your progress, and earn verified
            certificates.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/courses"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "gap-2",
              )}
            >
              Explore Courses
              <ArrowRight className="size-4" />
            </Link>

            <ContinueLearning />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t pt-6">
            <HeroStat value="Learn" label="Structured lessons" />
            <HeroStat value="Practice" label="Quizzes & assessments" />
            <HeroStat value="Achieve" label="Verified certificates" />
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border bg-card p-6 shadow-xl sm:p-8">
            <div className="rounded-2xl border bg-muted/30 p-5">
              <p className="text-sm font-medium text-primary">
                Your learning journey
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Everything you need to keep learning
              </h2>

              <div className="mt-6 space-y-4">
                <HeroFeature
                  title="Structured Courses"
                  description="Learn through organized sections and lessons."
                />

                <HeroFeature
                  title="Track Progress"
                  description="Continue exactly where you stopped."
                />

                <HeroFeature
                  title="Interactive Quizzes"
                  description="Test your knowledge and improve your score."
                />

                <HeroFeature
                  title="Earn Certificates"
                  description="Receive verified certificates after completion."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-semibold">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function HeroFeature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="font-medium">{title}</p>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
