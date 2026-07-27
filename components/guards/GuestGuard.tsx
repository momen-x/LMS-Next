"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoadingPage from "@/app/loading";
import { useGetCurrentUser } from "@/app/_modules/user/hooks/useGetCurrentUser";

type GuestGuardProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default function GuestGuard({
  children,
  redirectTo = "/",
}: GuestGuardProps) {
  const router = useRouter();

  const { data: user, isLoading, isError } = useGetCurrentUser();

  useEffect(() => {
    if (!isLoading && !isError && user) {
      router.replace(redirectTo);
    }
  }, [isLoading, isError, user, router, redirectTo]);

  if (isLoading) {
    return <LoadingPage />;
  }

  /*
   * A network/server error should not automatically mean
   * that the user is authenticated.
   *
   * You may replace this with a shared error component.
   */
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Unable to verify your session.
      </div>
    );
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}
