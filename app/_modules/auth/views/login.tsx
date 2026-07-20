/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

import loginImage from "@/public/assets/login.png";
import LoginByGoogleOrGithub from "./login-by-google-or-github";
import { useRouter } from "next/navigation";
import { loginFields as fields } from "./fields";
import { useLogin } from "../hooks/useLogin";
import { LoginData, loginSchema } from "../dto/login";
import { toast } from "react-toastify";
import getErrorMessage from "@/utils/get-axios-error-message";
import { CardContent, CardFooter } from "@/components/ui/card";
import ValidationInput from "@/components/inputs/validation-input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AUTH_ROUTES } from "../utils/constants";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const { mutate: submitLogin, isPending } = useLogin();

  const onSubmit = (data: LoginData) => {
    submitLogin(data, {
      onSuccess: () => {
        toast.success("Welcome back!.");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
      },
      onError: (error) => {
        console.error("Login failed:", error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage ?? "Login failed. Please try again.");
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
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
            <FormProvider {...form}>
              <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CardContent>
                  {fields.map(({ name, title, placeholder, Icon, type }) => (
                    <div key={name} className="space-y-3 mt-5 mb-5">
                      <ValidationInput<LoginData>
                        fieldTitle={
                          <>
                            <span className="text-muted-foreground">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-black">{title}</span>
                          </>
                        }
                        nameInSchema={name as keyof LoginData}
                        placeholder={placeholder}
                        className="h-10 rounded-xl"
                        type={type}
                      />
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1 mb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="border-muted-foreground/40 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-xs font-medium text-muted-foreground cursor-pointer select-none"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href={`${AUTH_ROUTES.forgotPassword}?email=${encodeURIComponent(
                        form.watch("email"),
                      )}`}
                      className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </CardContent>
              </form>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="login-form"
                  disabled={isPending}
                  className="mt-2 h-10 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 font-medium"
                >
                  Sign in
                </Button>
              </CardFooter>
            </FormProvider>

            <div className="mt-5 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href={`${AUTH_ROUTES.register}`}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign up
              </Link>
            </div>

            <div className="relative my-6 flex w-full items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <span className="relative bg-card px-3 text-xs text-muted-foreground/60">
                or continue with
              </span>
            </div>
            <LoginByGoogleOrGithub />
          </div>
        </div>

        <div className="relative hidden md:flex flex-col justify-between p-12 ">
          <Image
            src={loginImage}
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
