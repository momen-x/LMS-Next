export type PaymentStatus =
  | "pending"
  | "completed"
  | "expired"
  | "failed"
  | "refunded";

export interface Payment {
  id: string;
  studentId: string;
  courseId: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
  stripePaymentId: string | null;
  stripeSessionId: string | null;
  refundedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCheckoutResponse {
  payment: Payment;
  checkoutUrl: string;
}
