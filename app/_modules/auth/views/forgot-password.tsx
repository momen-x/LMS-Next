"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import forgotPasswordImage from "@/public/assets/forgot-password.png";

export function ForgotPasswordForm() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-8 md:p-12">
            <CardHeader className="space-y-1 p-0 pb-6 ">
              <div className="flex items-center gap-2 mb-8">
                <GraduationCap
                  size={40}
                  strokeWidth={2.5}
                  className="text-sky-500"
                />
                <span className="text-2xl font-bold text-foreground">LMS</span>
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Forgot your password?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                No worries! Enter your email and we&apos;ll <br /> send you a
                link to reset your password.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pb-6">
              <form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="h-10"
                    />
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 p-0">
              <Button
                type="submit"
                className="h-10 w-full bg-[#1E293B] hover:bg-[#0F172A]"
              >
                Send reset link
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Button
                  variant="link"
                  className="p-0 text-sky-500 hover:text-sky-600"
                >
                  Sign in
                </Button>
              </div>

              <div className="flex w-full items-center gap-4">
                <div className="flex-1 border-t border-gray-300" />
                <span className="text-xs text-muted-foreground">
                  or continue with
                </span>
                <div className="flex-1 border-t border-gray-300" />
              </div>
            </CardFooter>
          </div>

          <div className="relative hidden md:block flex-1 bg-sky-50">
            <Image
              src={forgotPasswordImage}
              alt="Login"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 120vw, 50vw"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
