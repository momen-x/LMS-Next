"use client";

import { Award, CalendarDays, Hash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Certificate } from "../entity/certificate";

type CertificateCardProps = {
  certificate: Certificate;
  courseTitle?: string;
  onView?: (certificate: Certificate) => void;
};

export default function CertificateCard({
  certificate,
  courseTitle,
  onView,
}: CertificateCardProps) {
  const issueDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(certificate.issueDate));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
          <Award className="size-5 text-primary" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Certificate of Completion
          </p>

          <h3 className="font-semibold">{courseTitle ?? "Completed Course"}</h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Hash className="size-4 text-muted-foreground" />

          <span className="text-muted-foreground">Certificate number:</span>

          <span className="font-medium">{certificate.certificateNumber}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="size-4 text-muted-foreground" />

          <span className="text-muted-foreground">Issued:</span>

          <span className="font-medium">{issueDate}</span>
        </div>
      </CardContent>

      {onView && (
        <CardFooter>
          <Button
            type="button"
            className="w-full"
            onClick={() => onView(certificate)}
          >
            View Certificate
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
