export interface ApiSuccessResponse {
  success: boolean;
  message?: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
  };
}