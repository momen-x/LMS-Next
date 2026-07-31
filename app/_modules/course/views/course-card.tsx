// components/course-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Course, CourseLevel } from "../entity/course";

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  className?: string;
}

const levelLabel: Record<CourseLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const levelVariant: Record<
  CourseLevel,
  "secondary" | "default" | "destructive"
> = {
  beginner: "secondary",
  intermediate: "default",
  advanced: "destructive",
};

function formatDuration(minutes: number = 0): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export function CourseCard({ course, onEnroll, className }: CourseCardProps) {
  const {
    id,
    title,
    thumbnail,
    price,
    level,
    averageRating,
    totalStudents,
    duration,
    lessonsCount,
  } = course;

  return (
    <Card className={cn("overflow-hidden pt-0 gap-3", className)}>
      <div className="relative aspect-video w-full bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <BookOpen className="size-10" />
          </div>
        )}

        <Badge
          className="absolute right-2 top-2"
          variant={price === 0 ? "secondary" : "default"}
        >
          {price === 0 ? "Free" : `$${price.toFixed(2)}`}
        </Badge>
      </div>

      <CardContent className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant={levelVariant[level]}>{levelLabel[level]}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span>{averageRating.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="line-clamp-2 font-semibold leading-snug">{title}</h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="size-4" />
            <span>{lessonsCount} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="size-4" />
            <span>{totalStudents}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Link href={`/courses/${id}`}>
          <Button variant="outline" className="flex-1">
            View Course
          </Button>
        </Link>
        <Button className="flex-1" onClick={() => onEnroll?.(id)}>
          Enroll
        </Button>
      </CardFooter>
    </Card>
  );
}
