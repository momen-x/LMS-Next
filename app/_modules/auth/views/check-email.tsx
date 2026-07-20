"use client";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import verification from "@/public/assets/verification1.png";
import woman from "@/public/assets/verification2.png";
import { AUTH_ROUTES } from "../utils/constants";
import { useSearchParams } from "next/navigation";

export default function CheckYourEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  if (!email) return <></>;
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-xl md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-10 lg:p-12">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg  text-primary-foreground">
              <GraduationCap className="h-5 w-5 text-sky-500 text-2xl" />
            </div>
            <span className="text-xl font-bold tracking-tight">LMS</span>
          </div>

          <div className="my-auto py-8 text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Verify your email
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ve sent a verification link to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>

            <div>
              <Image
                src={verification}
                alt="Student studying with warm ambient lighting"
              />
            </div>

            <div className="space-y-1 text-sm">
              <span className="text-muted-foreground">
                Didn&apos;t receive the email?
              </span>
              <Button
                variant="link"
                className="h-auto p-0 px-1 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Resend verification email
              </Button>
            </div>
          </div>

          <div className="mt-4 text-center md:text-left">
            <Link
              href={AUTH_ROUTES.login}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to sign in
            </Link>
          </div>
        </div>

        <div className="relative hidden min-h-125 bg-muted md:block">
          <Image
            src={woman}
            alt="Student studying with warm ambient lighting"
            fill
            priority
            className="object-cover object-center grayscale-15 brightness-90 dark:brightness-75"
            sizes="(max-width: 768px) 0vw, 50vw"
          />
          {/* Subtle warm overlay to mimic the exact photo ambiance */}
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/5 via-transparent to-transparent mix-blend-warm-lighting pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
