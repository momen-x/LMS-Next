"use client";

import { Loader2, LogIn, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/get-axios-error-message";
import { useEnrollInCourse } from "../hooks/useEnrollInCourse";
import { useIsUserEnrolledInCourse } from "../../enrollment/hooks/useIsUserEnrolledInCourse";

type EnrollmentButtonProps = {
  courseId: string;
  className?: string;
};

export default function EnrollmentButton({
  courseId,
  className,
}: EnrollmentButtonProps) {
  const router = useRouter();
  const { data: isAlreadyEnrolled } = useIsUserEnrolledInCourse(courseId);
console.log("isAlreadyEnrolled : ", isAlreadyEnrolled);

  const { mutate: enrollInCourse, isPending } = useEnrollInCourse();

  const handleEnrollment = () => {
    if (isAlreadyEnrolled) {
      router.push(`/student-dashboard/courses/${courseId}`);

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
