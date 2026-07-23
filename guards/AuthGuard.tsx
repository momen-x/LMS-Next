"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoadingPage from "@/app/loading";
import { useGetCurrentUser } from "@/app/_modules/user/hooks/useGetCurrentUser";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const { data: user, isLoading, isError } = useGetCurrentUser();

  useEffect(() => {
    if (!isLoading && !isError && !user) {
      router.replace("/login");
    }
  }, [isLoading, isError, user, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Unable to verify your session.
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
