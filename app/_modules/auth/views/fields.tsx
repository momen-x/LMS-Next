import { Lock, LucideIcon, Mail, User } from "lucide-react";
import { RegisterData } from "../dto/register";
import { LoginData } from "../dto/login";
import { ForgotPasswordData } from "../dto/forgot-password";
import { ResetPasswordData } from "../dto/reset-password";

type FormField<T extends string> = {
  name: T;
  title: string;
  placeholder: string;
  Icon: LucideIcon;
  type: "text" | "email" | "password";
};
export const registerFields = [
  {
    name: "name",
    title: "Enter your full name",
    placeholder: "Enter your full name",
    Icon: User,
    type: "text",
  },
  {
    name: "email",
    title: "Enter user email",
    placeholder: "example@example.com",
    Icon: Mail,
    type: "email",
  },
  {
    name: "password",
    title: "Enter the password",
    placeholder: "*********",
    Icon: Lock,
    type: "password",
  },
  {
    name: "confirmPassword",
    title: "Confirm the password",
    placeholder: "*********",
    Icon: Lock,
    type: "password",
  },
] satisfies FormField<keyof RegisterData & string>[];
export const loginFields = [
  {
    name: "email",
    title: "Enter your email",
    placeholder: "example@example.com",
    Icon: Mail,
    type: "email",
  },
  {
    name: "password",
    title: "Enter your password",
    placeholder: "*********",
    Icon: Lock,
    type: "password",
  },
] satisfies FormField<keyof LoginData & string>[];
export const forgotPasswordFields = [
  {
    name: "email",
    title: "Enter your email",
    placeholder: "example@example.com",
    Icon: Mail,
    type: "email",
  },
] satisfies FormField<keyof ForgotPasswordData & string>[];

export const resetPasswordFields = [
  {
    name: "password",
    title: "Enter new password",
    placeholder: "*********",
    Icon: Lock,
    type: "password",
  },
  {
    name: "confirmPassword",
    title: "Confirm the new password",
    placeholder: "*********",
    Icon: Lock,
    type: "password",
  },
] satisfies FormField<keyof ResetPasswordData & string>[];
