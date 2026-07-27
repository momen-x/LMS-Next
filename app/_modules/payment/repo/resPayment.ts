import { api } from "@/utils/axiosInstance";

import { CreateCheckoutResponse } from "../entity/payment";
import { IPaymentAPI } from "./payment";

export const resPayment: IPaymentAPI = {
  async createCheckout(courseId) {
    const response = await api.post<CreateCheckoutResponse>(
      `/api/payment/checkout/${courseId}`,
    );

    return response.data;
  },
};
