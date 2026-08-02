export const paymentQueryKeys = {
  all: ["payments"] as const,

  checkoutSession: (sessionId: string) =>
    [...paymentQueryKeys.all, "checkout-session", sessionId] as const,
};
