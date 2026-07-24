"use client";

import { api } from "@/utils/axiosInstance";
import { getErrorMessage } from "@/utils/get-axios-error-message";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AUTH_ROUTES } from "../utils/constants";

export default function EmailVerificationCard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const hasVerified = useRef(false);

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  useEffect(() => {
    if (hasVerified.current) return;

    hasVerified.current = true;

    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        toast.error("Invalid verification token", {
          toastId: "email-verification-error",
        });
        return;
      }

      try {
        await api.get("/api/auth/verify-email", {
          params: { token },
        });

        setStatus("success");

        toast.success("Email verified successfully", {
          toastId: "email-verification-success",
        });

        router.replace(AUTH_ROUTES.login);
      } catch (error: unknown) {
        setStatus("error");

        const errorMessage = getErrorMessage(error);

        toast.error(errorMessage ?? "Email verification failed", {
          toastId: "email-verification-error",
        });
      }
    };

    void verifyEmail();
  }, [router, token]);

  return (
    <div>
      {status === "verifying" && <h1>Verifying your email...</h1>}

      {status === "success" && <h1>Email verified successfully</h1>}

      {status === "error" && <h1>Email verification failed</h1>}
    </div>
  );
}
