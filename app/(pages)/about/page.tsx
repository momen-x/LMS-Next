import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import {
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About | LMS Platform",
  description:
    "Learn more about the LMS platform, its mission, features, architecture, and developer.",
};

const roleItems = [
  {
    title: "Students",
    description:
      "Learn through structured courses, follow progress, complete quizzes, and earn certificates.",
    icon: GraduationCap,
  },
  {
    title: "Instructors",
    description:
      "Create courses and manage sections, lessons, media, quizzes, and enrolled students.",
    icon: Code2,
  },
  {
    title: "Administrators",
    description:
      "Manage platform users, categories, courses, permissions, and operational activity.",
    icon: Users,
  },
];

const platformFeatures = [
  {
    title: "Structured learning",
    description:
      "Courses are organized into sections, lessons, media, quizzes, questions, and resources.",
    icon: Layers3,
  },
  {
    title: "Role-based experience",
    description:
      "Each user receives tools and protected routes designed for their responsibilities.",
    icon: Users,
  },
  {
    title: "Secure platform",
    description:
      "Authentication, authorization, CSRF protection, secure cookies, and validated permissions.",
    icon: LockKeyhole,
  },
  {
    title: "Progress tracking",
    description:
      "Students can monitor learning progress, quiz attempts, enrollments, and certificates.",
    icon: GraduationCap,
  },
];

const technologies = [
  "Next.js",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "Prisma",
  "TanStack Query",
  "Stripe",
  "Cloudinary",
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Badge variant="outline" className="gap-2">
              <BookOpen className="size-3.5" />
              About the platform
            </Badge>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Learning tools designed for every role.
            </h1>

            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              LMS is a modern learning management platform that helps
              instructors create educational content, enables students to learn
              through organized courses, and gives administrators the tools
              needed to manage the platform.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className={cn(buttonVariants({ variant: "default" }), "gap-2")}
              >
                Explore courses
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contact"
                className={buttonVariants({ variant: "outline" })}
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-6" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              One platform, three focused experiences.
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The platform separates student learning, instructor management,
              and administration while maintaining one consistent interface.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <SmallStat value="3" label="User roles" />
              <SmallStat value="10+" label="Core modules" />
              <SmallStat value="1" label="Unified LMS" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-medium text-primary">Our mission</p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Make online learning easier to manage and easier to follow.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              LMS combines course creation, enrollment, lesson delivery,
              quizzes, reviews, certificates, notifications, and payments in one
              organized system.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {roleItems.map((item) => (
              <RoleCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">
                Platform features
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Built around a complete learning workflow.
              </h2>

              <p className="mt-3 text-muted-foreground">
                Educational content management combined with secure, role-aware
                experiences.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {platformFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology and developer */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Code2 className="size-5" />
            </div>

            <p className="mt-5 text-sm font-medium text-primary">Technology</p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Modern full-stack architecture.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The application uses separate frontend and backend layers with
              secure authentication, role-based permissions, database
              validation, media storage, payment integration, and reusable
              feature modules.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <Badge key={technology} variant="secondary">
                  {technology}
                </Badge>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Code2 className="size-5" />
            </div>

            <p className="mt-5 text-sm font-medium text-primary">
              About the developer
            </p>

            <h2 className="mt-2 text-2xl font-bold">Mo&apos;men Alswafiri</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Full-Stack Developer
            </p>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              This platform was designed and developed with a focus on secure
              architecture, maintainable code, performance, responsive design,
              and a clear experience for students, instructors, and
              administrators.
            </p>

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-6 gap-2",
              )}
            >
              Get in touch
              <ArrowRight className="size-4" />
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}

interface IconItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function RoleCard({ title, description, icon: Icon }: IconItemProps) {
  return (
    <article className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>

      <h3 className="mt-4 font-semibold">For {title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

function FeatureCard({ title, description, icon: Icon }: IconItemProps) {
  return (
    <article className="flex gap-4 rounded-2xl border bg-background p-5 transition-colors hover:border-primary/30">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}

interface SmallStatProps {
  value: string;
  label: string;
}

function SmallStat({ value, label }: SmallStatProps) {
  return (
    <div className="rounded-xl border bg-muted/20 p-3 text-center">
      <p className="text-xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
