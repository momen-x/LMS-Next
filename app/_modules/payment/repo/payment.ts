import { CreateCheckoutResponse } from "../entity/payment";

export interface IPaymentAPI {
  createCheckout(courseId: string): Promise<CreateCheckoutResponse>;
}
