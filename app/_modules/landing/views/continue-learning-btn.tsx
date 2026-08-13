"use client";

import Link from "next/link";
import { useGetCurrentUser } from "../../user/hooks/useGetCurrentUser";
import { buttonVariants } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const ContinueLearning = () => {
  const { data: user } = useGetCurrentUser();

  if (user && user.role === "student")
    return (
      <Link
        href="/student-dashboard/courses"
        className={buttonVariants({
          variant: "outline",
          size: "lg",
        })}
      >
        <BookOpen className="mr-2 size-4" />
        Continue Learning
      </Link>
    );

  return null;
};

export default ContinueLearning;
