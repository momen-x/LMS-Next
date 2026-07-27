"use client";

import { Award, CalendarDays, Hash } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Certificate } from "../entity/certificate";

type CertificateDetailsProps = {
  certificate: Certificate;
  courseTitle?: string;
  studentName?: string;
};

export default function CertificateDetails({
  certificate,
  courseTitle,
  studentName,
}: CertificateDetailsProps) {
  const issueDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(certificate.issueDate));

  return (
    <Card className="overflow-hidden">
      <div className="bg-primary px-6 py-10 text-center text-primary-foreground">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary-foreground/10">
          <Award className="size-9" />
        </div>

        <p className="mt-4 text-sm font-medium uppercase tracking-widest">
          Certificate of Completion
        </p>

        <h1 className="mt-2 text-2xl font-bold">
          {courseTitle ?? "Course Completion"}
        </h1>
      </div>

      <CardHeader className="text-center">
        <p className="text-sm text-muted-foreground">
          This certificate is awarded to
        </p>

        <h2 className="text-xl font-semibold">{studentName ?? "Student"}</h2>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          For successfully completing all course requirements.
        </p>

        <div className="grid gap-3 rounded-lg border bg-muted/30 p-4 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Hash className="size-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">
                Certificate number
              </p>

              <p className="text-sm font-medium">
                {certificate.certificateNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Issue date</p>

              <p className="text-sm font-medium">{issueDate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
