export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  terms: "/terms",
  privacy: "/privacy",
} as const;
export const authKeys = {
  all: ["auth"] as const,
  csrf: () => [...authKeys.all, "csrf"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
  verifyEmail: (token: string) =>
    [...authKeys.all, "verify-email", token] as const,
};
