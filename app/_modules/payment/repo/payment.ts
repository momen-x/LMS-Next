import type { EnrollmentCheckoutResult, Payment } from "../entity/payment";

export interface IPaymentAPI {
  createCheckout: (courseId: string) => Promise<EnrollmentCheckoutResult>;

  verifyCheckoutSession: (sessionId: string) => Promise<Payment>;
}
