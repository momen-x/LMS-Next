"use client";

import { Calendar, Eye } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { UserCertificate } from "../entities/user-certificates";
import transformingTheDateToATextString from "@/utils/from-date-to-string";

interface CertificateCardProps {
  certificate: UserCertificate;
  onPreviewLink: string;
}

export default function CertificateCard({
  certificate,
  onPreviewLink,
}: CertificateCardProps) {
  const issueDate = transformingTheDateToATextString(certificate.issueDate);
  const { course } = certificate;

  return (
    <Card className="flex flex-col justify-between overflow-hidden rounded-xl border bg-card shadow-xs transition-shadow hover:shadow-md">
      {/* Top Section: Horizontal Layout */}
      <div className="flex items-start gap-4 p-4">
        {/* Thumbnail on the Left */}
        <div className="relative aspect-4/3 w-32 shrink-0 overflow-hidden rounded-lg border bg-muted">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
              No Image
            </div>
          )}
        </div>

        {/* Content on the Right */}
        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="line-clamp-2 text-sm font-bold text-card-foreground leading-snug"
              title={course.title}
            >
              {course.title}
            </h3>
          </div>

          <div className="mt-2 space-y-2">
            {/* Issue Date */}
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5 shrink-0" />
              <span>Issued on {issueDate}</span>
            </p>

            {/* Instructor */}
            {course.instructor && (
              <div className="flex items-center gap-2 pt-0.5">
                <Avatar className="size-5 border">
                  <AvatarImage
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                  />
                  <AvatarFallback className="text-[10px]">
                    {course.instructor.name?.[0] || "I"}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate text-xs font-medium text-muted-foreground">
                  {course.instructor.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="grid grid-cols-1 gap-2 border-t bg-muted/20 p-2.5">
        <Link
          href={onPreviewLink}
          className="h-8 gap-1.5 text-xs font-medium text-muted-foreground hover:bg-background hover:text-foreground hover:shadow-xs"
        >
          <Button type="button" variant="ghost" size="sm" className="w-full m-auto">
            <Eye className="size-3.5" />
            Preview
          </Button>
        </Link>
      </div>
    </Card>
  );
}
