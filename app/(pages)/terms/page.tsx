import { Metadata } from "next";
import {
  FileText,
  UserCheck,
  BookOpen,
  CreditCard,
  Ban,
  Scale,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Terms of Service | LMS Platform",
  description:
    "Read the rules, terms, and guidelines for using our LMS platform.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "July 30, 2026";

  return (
    <main className="container max-w-4xl py-10 md:py-16 space-y-8 w-full m-auto">
      {/* Header */}
      <div className="space-y-3 text-center md:text-left">
        <Badge
          variant="outline"
          className="gap-1.5 py-1 px-3 border-primary/30 text-primary"
        >
          <FileText className="size-3.5" /> User Agreement
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </div>

      <div className="space-y-6">
        {/* Intro */}
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6 text-muted-foreground leading-relaxed text-sm">
            Welcome to our LMS platform. By creating an account or accessing any
            courses, you agree to comply with and be bound by the following
            Terms of Service. Please read them carefully before using our
            platform.
          </CardContent>
        </Card>

        {/* 1. Account Obligations */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="size-5 text-primary" />
              1. User Accounts & Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                You must provide accurate and complete information when
                registering.
              </li>
              <li>
                You are solely responsible for maintaining the confidentiality
                of your account password.
              </li>
              <li>
                Account sharing is strictly prohibited. Your account is for your
                personal use only.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 2. Educational Content & Intellectual Property */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              2. Content & Intellectual Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              All course content, including videos, code snippets, quizzes,
              materials, and trademarks, are owned by the instructors or the
              platform.
            </p>
            <p>
              Enrolling in a course gives you a limited, non-exclusive,
              non-transferable license to access and view the course materials.
              You{" "}
              <strong className="text-foreground">
                may not record, redistribute, sell, or copy
              </strong>{" "}
              any course material.
            </p>
          </CardContent>
        </Card>

        {/* 3. Payments & Refunds */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              3. Payments, Pricing & Refunds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Prices for courses are displayed at checkout. Instructors or
              platform administrators reserve the right to modify prices or run
              promotions at any time.
            </p>
          </CardContent>
        </Card>

        {/* 4. Prohibited Conduct */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Ban className="size-5 text-destructive" />
              4. Prohibited Conduct
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>When using our service, you agree NOT to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Upload malicious code, viruses, or exploit system
                vulnerabilities.
              </li>
              <li>
                Harass, abuse, or post offensive content in course discussions
                or instructor feedback.
              </li>
              <li>
                Attempt to bypass paywalls or gain unauthorized access to
                instructor admin areas.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 5. Limitation of Liability */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="size-5 text-primary" />
              5. Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Our platform provides content on an &quot;as-is&quot; basis. While
              we strive for accuracy, we do not guarantee that course material
              will meet specific job requirements or lead to certified
              employment automatically.
            </p>
          </CardContent>
        </Card>

        {/* Termination Notice */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-4" /> Account Termination
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            We reserve the right to suspend or terminate accounts that violate
            these Terms of Service without prior notice or refund eligibility.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
