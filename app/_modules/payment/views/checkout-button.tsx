"use client";

import { CreditCard, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/get-axios-error-message";

import { useCreateCheckout } from "../hooks/useCreateCheckout";

type CheckoutButtonProps = {
  courseId: string;
  disabled?: boolean;
  className?: string;
};

export default function CheckoutButton({
  courseId,
  disabled = false,
  className,
}: CheckoutButtonProps) {
  const { mutate: createCheckout, isPending } = useCreateCheckout();

  function handleCheckout() {
    createCheckout(courseId, {
      onSuccess: ({ checkoutUrl }) => {
        window.location.assign(checkoutUrl);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  }

  return (
    <Button
      type="button"
      className={className}
      disabled={disabled || isPending}
      onClick={handleCheckout}
    >
      {isPending ? (
        <>
          <LoaderCircle className="animate-spin" />
          Redirecting...
        </>
      ) : (
        <>
          <CreditCard />
          Buy course
        </>
      )}
    </Button>
  );
}
