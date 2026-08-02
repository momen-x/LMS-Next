"use client";

import { useQuery } from "@tanstack/react-query";

import { resPayment } from "../repo/resPayment";
import { paymentQueryKeys } from "./payment-query-keys";

export function useVerifyCheckoutSession(sessionId: string | null) {
  return useQuery({
    queryKey: paymentQueryKeys.checkoutSession(sessionId ?? ""),
    queryFn: () => {
      if (!sessionId) {
        throw new Error("Missing Stripe checkout session ID");
      }

      return resPayment.verifyCheckoutSession(sessionId);
    },
    enabled: Boolean(sessionId),
    retry: 3,
    retryDelay: 1500,
    refetchInterval: (query) => {
      const payment = query.state.data;

      return payment?.status === "pending" ? 2000 : false;
    },
  });
}
