"use client";

import { useMutation } from "@tanstack/react-query";

import { resPayment } from "../repo/resPayment";

export function useCreateCheckout() {
  return useMutation({
    mutationFn: (courseId: string) => resPayment.createCheckout(courseId),
  });
}
