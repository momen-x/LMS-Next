"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import loginImage from "@/public/assets/login.png";
import LoginByGoogleOrGithub from "./login-by-google-or-github";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

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

            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-10 border-border bg-background placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-foreground"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="h-10 pr-10 border-border bg-background placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
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
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="mt-2 h-10 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 font-medium"
              >
                Sign in
              </Button>
            </form>

            <div className="mt-5 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
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
