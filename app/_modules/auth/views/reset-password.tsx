/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

import resetPasswordImage from "@/public/assets/reset-password.png";
import { useResetPassword } from "../hooks/useResetpassword";
import { ResetPasswordData, resetPasswordSchema } from "../dto/reset-password";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/get-axios-error-message";
import { resetPasswordFields as fields } from "./fields";
import { CardContent, CardFooter } from "@/components/ui/card";
import ValidationInput from "@/components/inputs/validation-input";
import { AUTH_ROUTES } from "../utils/constants";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema as any),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const { mutate: submitResetPassword, isPending } = useResetPassword();

  const onSubmit = (data: ResetPasswordData) => {
    if (!token || typeof token !== "string") {
      toast.error("Invalid token");
      return;
    }
    submitResetPassword(
      { data, token },
      {
        onSuccess: () => {
          toast.success("Welcome back!.");
          router.push(AUTH_ROUTES.login);
          router.refresh();
        },
        onError: (error) => {
          console.error("Reset password failed:", error);
          const errorMessage = getErrorMessage(error);
          toast.error(
            errorMessage ?? "Reset password failed. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-xl md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-10 lg:p-12">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sky-600 dark:text-sky-500">
              <GraduationCap className="h-5 w-5 default" />
            </div>
            <span className="text-xl font-bold tracking-tight">LMS</span>
          </div>

          <div className="my-auto py-6">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Reset your password
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Enter your new password below.
            </p>

            <FormProvider {...form}>
              <form
                id="reset-password-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CardContent>
                  {fields.map(({ name, title, placeholder, Icon, type }) => (
                    <div key={name} className="space-y-3 mt-5 mb-5">
                      <ValidationInput<ResetPasswordData>
                        fieldTitle={
                          <>
                            <span className="text-muted-foreground">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-black">{title}</span>
                          </>
                        }
                        nameInSchema={name as keyof ResetPasswordData}
                        placeholder={placeholder}
                        className="h-10 rounded-xl"
                        type={type}
                      />
                    </div>
                  ))}
                  <div className="space-y-2 text-muted-foreground mb-3">
                    <p className="text-sm">Password must contain:</p>
                    <p className="text-xs">✅ At lest 8 characters</p>
                    <p className="text-xs">
                      ✅ At lest one Uppercase character
                    </p>
                    <p className="text-xs">
                      ✅ At lest one Lowercase character
                    </p>
                    <p className="text-xs">✅ At lest one Number</p>
                    <p className="text-xs">✅ At lest one Special character</p>
                  </div>
                </CardContent>
              </form>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="reset-password-form"
                  disabled={isPending}
                  className="mt-2 h-10 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 font-medium"
                >
                  Reset password
                </Button>
              </CardFooter>
            </FormProvider>
          </div>
        </div>

        <div className="relative hidden md:flex flex-col justify-between p-12">
          <Image
            src={resetPasswordImage}
            alt="Person studying on their laptop"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 0vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
