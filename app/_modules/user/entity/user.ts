export type UserRole = "admin" | "instructor" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: "local" | "google" | "facebook" | "github";
  providerId?: string | null;
  avatar?: string | null;
  avatarId?: string | null;
  isVerified: boolean;
  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;
}
