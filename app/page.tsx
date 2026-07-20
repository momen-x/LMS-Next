import { ForgotPasswordForm } from "./_modules/auth/views/forgot-password";
import { LoginForm } from "./_modules/auth/views/login";
import { RegisterForm } from "./_modules/auth/views/register";
import { ResetPasswordForm } from "./_modules/auth/views/reset-password";
import EmailVerificationCard from "./_modules/auth/views/verify-email";
import LoadingPage from "./loading";

export default function Home() {

  return (
    <div>
      <LoadingPage/>
      <RegisterForm />
      <LoginForm />
      <ForgotPasswordForm />
      <ResetPasswordForm />
      <EmailVerificationCard />
    </div>
  );
}
