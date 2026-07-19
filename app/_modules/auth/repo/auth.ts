import { LoginData } from "../dto/login";
import { RegisterDataAPI } from "../dto/register";
import { ForgotPasswordData } from "../dto/forgot-password";
import { ResetPasswordData } from "../dto/reset-password";
import { ResendVerificationData } from "../dto/resend-verification";

interface IAuthAPI {
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>;
  register: (
    data: RegisterDataAPI,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<{ success: boolean }>;
  forgotPassword: (data: ForgotPasswordData) => Promise<{ success: boolean }>;
  resetPassword: (
    token: string,
    data: ResetPasswordData,
  ) => Promise<{ success: boolean }>;
    resendVerification: (data: ResendVerificationData) => Promise<{ success: boolean }>;
  verifyEmail: (token: string) => Promise<{ success: true; message: string }>;
  csrfToken: () => Promise<string>;
  refreshToken: () => Promise<string>;

  //   getCurrentUser: () => Promise<any>;
}

export default IAuthAPI;
