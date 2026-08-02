import { api } from "@/utils/axiosInstance";

import type { EnrollmentCheckoutResult, Payment } from "../entity/payment";
import type { IPaymentAPI } from "./payment";

const BASE_URL = "/api/payments";

export const resPayment: IPaymentAPI = {
  async createCheckout(courseId: string): Promise<EnrollmentCheckoutResult> {
    const response = await api.post<EnrollmentCheckoutResult>(
      `${BASE_URL}/checkout/${courseId}`,
    );

    return response.data;
  },

  async verifyCheckoutSession(sessionId: string): Promise<Payment> {
    const response = await api.get<Payment>(
      `${BASE_URL}/checkout/session/${encodeURIComponent(sessionId)}`,
    );
    console.log("VERIFY PAYMENT RESPONSE:", response.data);

    return response.data;
  },
};
