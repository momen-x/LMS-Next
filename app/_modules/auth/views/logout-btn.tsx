"use client";
import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/get-axios-error-message";
import { AUTH_ROUTES } from "../utils/constants";

const LogoutBtn = () => {
  const { mutate: logout } = useLogout();
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        logout(undefined, {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push(AUTH_ROUTES.login);
            router.refresh();
          },
          onError: (error) => {
            console.error("Logout failed:", error);
            const err = getErrorMessage(error);
            toast.error(err ?? "Logout failed. Please try again.");
          },
        });
      }}
      className="text-red-500"
      variant={"ghost"}
    >
      Sign out
    </Button>
  );
};

export default LogoutBtn;
