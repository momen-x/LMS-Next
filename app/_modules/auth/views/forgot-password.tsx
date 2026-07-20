/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

import forgotPasswordImage from "@/public/assets/forgot-password.png";
import { useRouter, useSearchParams } from "next/navigation";
import { forgotPasswordFields as fields } from "./fields";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/get-axios-error-message";
import { CardContent, CardFooter } from "@/components/ui/card";
import ValidationInput from "@/components/inputs/validation-input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  ForgotPasswordData,
  forgotPasswordSchema,
} from "../dto/forgot-password";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { AUTH_ROUTES } from "../utils/constants";

export function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const router = useRouter();
  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema as any),
    defaultValues: {
      email: email,
    },
    mode: "onChange",
  });
  const { mutate: submitForgotPassword, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordData) => {
    submitForgotPassword(data, {
      onSuccess: () => {
        toast.success("Email sent successfully! Please check your inbox.");
        setTimeout(() => {
          router.push(AUTH_ROUTES.login);
          router.refresh();
        }, 500);
      },
      onError: (error) => {
        console.error("verification failed:", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage ?? "Verification failed. Please try again.");
      },
    });
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
              Forgot your password?
            </h1>
            <p className="mt-2.5 mb-2.5 text-sm text-muted-foreground">
              No worries! Enter your email and we&apos;ll <br />
              send you a link to reset your password.
            </p>
            <FormProvider {...form}>
              <form
                id="forgot-password-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-12"
              >
                <CardContent>
                  {fields.map(({ name, title, placeholder, Icon, type }) => (
                    <div key={name} className="space-y-3 mt-5 mb-5">
                      <ValidationInput<ForgotPasswordData>
                        fieldTitle={
                          <>
                            <span className="text-muted-foreground">
                              <Icon  className="h-4 w-4"/>
                            </span>
                            <span className="text-black">{title}</span>
                          </>
                        }
                        nameInSchema={name as keyof ForgotPasswordData}
                        placeholder={placeholder}
                        className="h-10 rounded-xl"
                        type={type}
                      />
                    </div>
                  ))}
                </CardContent>
              </form>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="forgot-password-form"
                  disabled={isPending}
                  className="mt-2 h-10 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 font-medium"
                >
                  {isPending ? "Sending..." : "Send reset link"}
                </Button>
              </CardFooter>
            </FormProvider>

            <div className="text-center text-sm text-muted-foreground mt-8">
              Remember your password?{" "}
              <Link href={`${AUTH_ROUTES.login}`} className="font-medium">
                <Button className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden md:flex flex-col justify-between p-12 ">
          <Image
            src={forgotPasswordImage}
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
