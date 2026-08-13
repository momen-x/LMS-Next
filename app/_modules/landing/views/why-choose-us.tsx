
import {
  Award,
  BookOpenCheck,
  ChartNoAxesColumnIncreasing,
  FileQuestion,
} from "lucide-react";

const features = [
  {
    title: "Structured Learning",
    description: "Learn through organized courses, sections, and lessons.",
    icon: BookOpenCheck,
  },
  {
    title: "Track Your Progress",
    description: "See your progress and continue exactly where you stopped.",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: "Test Your Knowledge",
    description: "Take quizzes, review your results, and improve your score.",
    icon: FileQuestion,
  },
  {
    title: "Earn Certificates",
    description:
      "Receive verified certificates when you complete your courses.",
    icon: Award,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Why LMS?</p>

          <h2 className="mt-2 text-3xl font-bold">
            Everything you need to succeed
          </h2>

          <p className="mt-3 text-muted-foreground">
            A complete learning experience from your first lesson to your
            certificate.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-5 font-semibold">{feature.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
