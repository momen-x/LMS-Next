import { LoginData } from "../dto/login";
import { RegisterDataAPI } from "../dto/register";
import { ForgotPasswordData } from "../dto/forgot-password";
import { ResetPasswordData } from "../dto/reset-password";
import { ResendVerificationData } from "../dto/resend-verification";
import { ApiSuccessResponse } from "../interface/auth";

interface IAuthAPI {
  login: (data: LoginData) => Promise<ApiSuccessResponse>;
  register: (data: RegisterDataAPI) => Promise<ApiSuccessResponse>;
  logout: () => Promise<{ success: boolean }>;
  forgotPassword: (data: ForgotPasswordData) => Promise<ApiSuccessResponse>;
  resetPassword: (
    token: string,
    data: ResetPasswordData,
  ) => Promise<ApiSuccessResponse>;
  resendVerification: (
    data: ResendVerificationData,
  ) => Promise<ApiSuccessResponse>;
  verifyEmail: (token: string) => Promise<ApiSuccessResponse>;
  csrfToken: () => Promise<{ csrfToken: string }>;
  refreshToken: () => Promise<ApiSuccessResponse>;

  //   getCurrentUser: () => Promise<any>;
}

export default IAuthAPI;
