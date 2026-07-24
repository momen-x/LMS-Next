import { FormField } from "@/types/form-fields";
import { Lock, User } from "lucide-react";
import {
  TUpdateUsername,
  TUpdatePassword,
} from "../../dto/update-user-profile";

export const updateUserNameFields = [
  {
    name: "name",
    title: "Enter your full name",
    placeholder: "your full name",
    Icon: User,
    type: "text",
  },
] satisfies FormField<keyof TUpdateUsername & string>[];
export const updateUserPasswordFields = [
  {
    name: "password",
    title: "Enter your old password",
    placeholder: "••••••••",
    Icon: Lock,
    type: "password",
  },
  {
    name: "newPassword",
    title: "Enter your new password",
    placeholder: "••••••••",
    Icon: Lock,
    type: "password",
  },
  {
    name: "confirmPassword",
    title: "Confirm your new password",
    placeholder: "••••••••",
    Icon: Lock,
    type: "password",
  },
] satisfies FormField<keyof TUpdatePassword & string>[];
