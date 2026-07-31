"use client";

import { Award, Calendar, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Certificate } from "../entity/certificate";
import transformingTheDateToATextString from "@/utils/from-date-to-string";

interface CertificateCardProps {
  certificate: Certificate;
  onPreview: (certificate: Certificate) => void;
}

export default function CertificateCard({
  certificate,
  onPreview,
}: CertificateCardProps) {
  const issueDate = transformingTheDateToATextString(certificate.issueDate);

  return (
    <Card className="overflow-hidden border bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-primary/10 text-primary">
            <Award className="size-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold">
              Course Certificate
            </h3>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              Certificate #{certificate.certificateNumber}
            </p>

            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              Issued {issueDate}
            </p>
          </div>
        </div>

        <div className="border-t pt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={() => onPreview(certificate)}
          >
            <Eye className="size-4" />
            View certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
