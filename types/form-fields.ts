import { LucideIcon } from "lucide-react";

export type FormField<T extends string> = {
  name: T;
  title: string;
  placeholder: string;
  Icon: LucideIcon;
  type: "text" | "email" | "password" | "number" | "date" | "select";
};