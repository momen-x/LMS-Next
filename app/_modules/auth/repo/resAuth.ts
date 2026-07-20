import api from "@/utils/axiosInstance";
import { LoginData } from "../dto/login";
import { RegisterDataAPI } from "../dto/register";
import IAuthAPI from "./auth";
import { ForgotPasswordData } from "../dto/forgot-password";
import { ResetPasswordData } from "../dto/reset-password";
import { ResendVerificationData } from "../dto/resend-verification";
import { ApiSuccessResponse } from "../interface/auth";

const BASE_URL = "/api/auth";

export const resAuth: IAuthAPI = {
  login: async (data: LoginData) => {
    const res = await api.post<ApiSuccessResponse>(`${BASE_URL}/login`, data);
    return res.data;
  },
  register: async (data: RegisterDataAPI) => {
    const res = await api.post<ApiSuccessResponse>(
      `${BASE_URL}/register`,
      data,
    );
    return res.data;
  },
  logout: async () => {
    const res = await api.post<ApiSuccessResponse>(`${BASE_URL}/logout`);
    return res.data;
  },
  forgotPassword: async function (
    data: ForgotPasswordData,
  ): Promise<ApiSuccessResponse> {
    const res = await api.post<ApiSuccessResponse>(
      `${BASE_URL}/forgot-password`,
      data,
    );
    return res.data;
  },
  resetPassword: async function (
    token: string,
    data: ResetPasswordData,
  ): Promise<ApiSuccessResponse> {
    const res = await api.post<ApiSuccessResponse>(
      `${BASE_URL}/reset-password/${token}`,
      data,
    );
    return res.data;
  },
  verifyEmail: async function (token: string): Promise<ApiSuccessResponse> {
    const res = await api.get<ApiSuccessResponse>(
      `${BASE_URL}/verify-email?token=${token}`,
    );
    return res.data;
  },
  csrfToken: async function (): Promise<{ csrfToken: string }> {
    const res = await api.get<{ csrfToken: string }>(`${BASE_URL}/csrf-token`);
    return res.data;
  },
  refreshToken: async function (): Promise<ApiSuccessResponse> {
    const res = await api.post<ApiSuccessResponse>(`${BASE_URL}/refresh`);
    return res.data;
  },
  resendVerification: async function (
    data: ResendVerificationData,
  ): Promise<ApiSuccessResponse> {
    const res = await api.post<ApiSuccessResponse>(
      `${BASE_URL}/resend-verification`,
      data,
    );
    return res.data;
  },
};
