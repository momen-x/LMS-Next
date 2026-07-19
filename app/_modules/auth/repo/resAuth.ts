import api from "@/utils/axiosInstance";
import { LoginData } from "../dto/login";
import { RegisterDataAPI } from "../dto/register";
import IAuthAPI from "./auth";
import { ForgotPasswordData } from "../dto/forgot-password";
import { ResetPasswordData } from "../dto/reset-password";
import { ResendVerificationData } from "../dto/resend-verification";

const BASE_URL = "/api/auth";

export const resAuth: IAuthAPI = {
  login: async (data: LoginData) => {
    const res = await api.post(`${BASE_URL}/login`, data);
    return res.data;
  },
  register: async (data: RegisterDataAPI) => {
    const res = await api.post(`${BASE_URL}/register`, data);
    return res.data;
  },
  logout: async () => {
    const res = await api.post(`${BASE_URL}/logout`);
    return res.data;
  },
  forgotPassword: async function (
    data: ForgotPasswordData,
  ): Promise<{ success: boolean }> {
    const res = await api.post(`${BASE_URL}/forgot-password`, data);
    return res.data;
  },
  resetPassword: async function (
    token: string,
    data: ResetPasswordData,
  ): Promise<{ success: boolean }> {
    const res = await api.post(`${BASE_URL}/reset-password/${token}`, data);
    return res.data;
  },
  verifyEmail: async function (
    token: string,
  ): Promise<{ success: true; message: string }> {
    const res = await api.get(`${BASE_URL}/verify-email?token=${token}`);
    return res.data;
  },
  csrfToken: async function (): Promise<string> {
    const res = await api.get(`${BASE_URL}/csrf-token`);
    return res.data;
  },
  refreshToken: async function (): Promise<string> {
    const res = await api.post(`${BASE_URL}/refresh-token`);
    return res.data;
  },
  resendVerification: async function (
    data: ResendVerificationData,
  ): Promise<{ success: boolean }> {
    const res = await api.post(`${BASE_URL}/resend-verification`, data);
    return res.data;
  },
};
