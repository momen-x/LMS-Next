import Link from "next/link";
import React from "react";
import { AUTH_ROUTES } from "../_modules/auth/utils/constants";

const LoginPage = () => {
  return (
    <div>
      LoginPage
      <Link href={`${AUTH_ROUTES.forgotPassword}`}>Forgot Password</Link>
    </div>
  );
};

export default LoginPage;
