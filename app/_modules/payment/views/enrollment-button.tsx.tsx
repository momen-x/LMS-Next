"use client";

import { Loader2, LogIn, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/get-axios-error-message";
import { useEnrollInCourse } from "../hooks/useEnrollInCourse";
import { useIsUserEnrolledInCourse } from "../../enrollment/hooks/useIsUserEnrolledInCourse";
import { useGetCurrentUser } from "../../user/hooks/useGetCurrentUser";

type EnrollmentButtonProps = {
  courseId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function EnrollmentButton({
  courseId,
  className,
  size,
}: EnrollmentButtonProps) {
  const router = useRouter();
  const { data: isAlreadyEnrolled } = useIsUserEnrolledInCourse(courseId);
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const { mutate: enrollInCourse, isPending } = useEnrollInCourse();

  const handleEnrollment = () => {
    if (!isCurrentUserLoading && !currentUser) {
      toast.info("please log in to continue enrolling in this course");
      return;
    }
    if (isAlreadyEnrolled) {
      router.push(`/courses/${courseId}/learning`);

      return;
    }

    enrollInCourse(courseId, {
      onSuccess: (result) => {
        if ("checkoutUrl" in result) {
          window.location.assign(result.checkoutUrl);
          return;
        }

        toast.success("You have successfully enrolled in this course");
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <Button
      type="button"
      className={className}
      disabled={isPending}
      onClick={handleEnrollment}
      size={size === "md" ? "default" : size || "default"}
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Processing...
        </>
      ) : isAlreadyEnrolled ? (
        <>
          <LogIn className="size-4" />
          Continue Learning
        </>
      ) : (
        <>
          <ShoppingCart className="size-4" />
          Enroll Now
        </>
      )}
    </Button>
  );
}
