import type { Enrollment } from "@/app/_modules/enrollment/entities/enrollment";

export type StripeCheckoutResult = {
  payment: {
    id: string;
    studentId: string;
    courseId: string;
    stripeSessionId: string | null;
    status: string;
  };
  checkoutUrl: string;
};

export type CreatePaymentResult = Enrollment | StripeCheckoutResult;
