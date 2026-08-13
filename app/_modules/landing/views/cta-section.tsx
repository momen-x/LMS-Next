
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border bg-card px-6 py-14 text-center sm:px-10">
        <h2 className="text-3xl font-bold">
          Ready to start learning?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Explore available courses, start learning at your own pace, and
          build skills that move you forward.
        </p>

        <div className="mt-7">
          <Link
            href="/courses"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2",
            )}
          >
            Browse Courses
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}