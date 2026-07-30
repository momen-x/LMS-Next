import { Metadata } from "next";
import {
  ShieldCheck,
  Lock,
  Cookie,
  CreditCard,
  Mail,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy | LMS Platform",
  description: "Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 30, 2026";

  return (
    <main className="container max-w-4xl py-10 md:py-16 space-y-8 w-full m-auto">
      {/* Header */}
      <div className="space-y-3 text-center md:text-left">
        <Badge
          variant="outline"
          className="gap-1.5 py-1 px-3 border-primary/30 text-primary"
        >
          <ShieldCheck className="size-3.5" /> Privacy & Security
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </div>

      <div className="space-y-6">
        {/* Intro */}
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6 text-muted-foreground leading-relaxed text-sm">
            At our LMS platform, we take your privacy seriously. This Privacy
            Policy explains what personal data we collect, why we collect it,
            how we use and protect it, and your rights regarding your
            information when using our educational services.
          </CardContent>
        </Card>

        {/* 1. Information We Collect */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="size-5 text-primary" />
              1. Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              We collect information to provide better services to all our
              users. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">
                  Account Information:
                </strong>{" "}
                Name, email address, password, and profile picture provided
                during registration.
              </li>
              <li>
                <strong className="text-foreground">Learning Activity:</strong>{" "}
                Courses enrolled, lesson progress, quiz scores, completed
                assignments, and certificates earned.
              </li>
              <li>
                <strong className="text-foreground">Instructor Data:</strong>{" "}
                Course content created, student management logs, and payout
                information.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 2. Payment & Financial Data */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              2. Payments & Financial Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              When you purchase a course, payments are processed securely
              through integrated payment gateways.
            </p>
            <p>
              We{" "}
              <strong className="text-foreground">
                do not store credit card numbers
              </strong>{" "}
              or sensitive banking credentials directly on our servers. All
              financial transactions are encrypted and handled strictly by
              certified third-party payment processors.
            </p>
          </CardContent>
        </Card>

        {/* 3. Cookies & Tracking Technologies */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Cookie className="size-5 text-primary" />
              3. Cookies and Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>We use cookies and essential local storage mechanisms to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Keep you signed in to your account seamlessly.</li>
              <li>Remember your preferences (such as Light/Dark mode).</li>
              {/* <li>
                Analyze site usage and performance to enhance overall platform
                UX.
              </li> */}
            </ul>
          </CardContent>
        </Card>

        {/* 4. Data Security */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="size-5 text-primary" />
              4. How We Protect Your Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              We implement industry-standard security measures including SSL
              encryption, secure server architecture, and role-based access
              restrictions to protect your personal information against
              unauthorized access, alteration, or disclosure.
            </p>
          </CardContent>
        </Card>

        {/* 5. Contact Us */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="size-5 text-primary" />
              5. Contacting Us
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            If you have questions or concerns regarding this Privacy Policy or
            your personal data, please contact our support team at{" "}
            <a href="mailto:moamenalswafiri@gmail.com" className="text-primary underline" target="_blank">
              moamenalswafiri@gmail.com
            </a>
            .
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
