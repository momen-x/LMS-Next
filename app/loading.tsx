"use client";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import loadingImage from "@/public/assets/loading.png";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const steps = [
  { value: 13, duration: 400 },
  { value: 66, duration: 700 },
  { value: 100, duration: 900 },
  { value: 0, duration: 300 },
] as const;

export default function LoadingPage() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const currentDuration = steps[stepIndex].duration;

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [stepIndex]);

  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6"
    >
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-xl md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-10 lg:p-12">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-lg text-primary-foreground">
              <GraduationCap
                size={90}
                className="text-sky-500 fill"
              />
            </div>
            <span className="text-4xl font-bold tracking-tight">LMS</span>
          </div>

          <div className="my-auto py-8 text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Learning Management System
            </h1>
          </div>

          <div>
            <Progress
              value={steps[stepIndex].value}
              className="w-[60%] mb-5 bg-gray-200 dark:bg-gray-700 **:data-[slot=progress-indicator]:bg-blue-600"
            />
            <p>Loading your learning journey ...</p>
          </div>
        </div>

        {/* Right Side: Split View Focused Image */}
        <div className="relative hidden min-h-125 bg-muted md:block">
          <Image
            src={loadingImage}
            alt="Student studying with warm ambient lighting"
            fill
            priority
            className="object-cover object-center grayscale-15 brightness-90 dark:brightness-75"
            sizes="(max-width: 768px) 0vw, 50vw"
          />
          {/* Subtle warm overlay to mimic the exact photo ambiance */}
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/5 via-transparent to-transparent mix-blend-soft-light pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
