"use client";
import { useForgotPassword } from "@/app/_modules/auth/hooks/useForgotPassword";
import { useResendVerification } from "@/app/_modules/auth/hooks/useResendVerification";
import CheckYourEmail from "@/app/_modules/auth/views/check-email";
import { useSearchParams } from "next/navigation";

const CheckYourEmailPage = () => {
  const { mutate: resendVerification } = useResendVerification();
  const { mutate: forgotPassword } = useForgotPassword();
  const searchParams = useSearchParams();
  const verify = searchParams.get("verify") ?? "";
  const forgot = searchParams.get("forgot") ?? "";
  return (
    <div>

      {verify && <CheckYourEmail fun={resendVerification} />}
      {forgot && <CheckYourEmail fun={forgotPassword} />}
    </div>
  );
};

export default CheckYourEmailPage;
