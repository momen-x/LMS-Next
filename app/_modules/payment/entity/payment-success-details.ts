import { Course } from "../../course/entities/course";
import { PaymentStatus } from "./payment";

export type PaymentSuccessDetails = {
  status: PaymentStatus;

  payment: {
    id: string;
    amount: number;
    currency: string;
    paymentMethod: string | null;
    transactionId: string | null;
    createdAt: string;
  } | null;

  course: Course | null;
};
