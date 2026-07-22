/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import ValidationInput from "@/components/inputs/validation-input";

import { useDeleteUser } from "../hooks/useDeleteUser";

import { deleteUserAccountFields as fields } from "./fields/user-fields";
import { AUTH_ROUTES } from "@/app/_modules/auth/utils/constants";

import {
  DeleteUserAccountSchema,
  TDeleteUserAccount,
  TDeleteUserAccountForm,
} from "../dto/delete-user-account";

import getAxiosErrorMessage from "@/utils/get-axios-error-message";

export default function DeleteUserAccount() {
  const router = useRouter();
  const form = useForm<TDeleteUserAccountForm>({
    resolver: zodResolver(DeleteUserAccountSchema as any),
    defaultValues: {
      delete: "",
    },
    mode: "onChange",
  });
  const { mutate: deleteUser, isPending } = useDeleteUser();
  const onSubmit = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        toast.success("Account deleted successfully");
        router.push(AUTH_ROUTES.login);
        router.refresh();
      },
      onError: (error) => {
        console.error("Account deletion failed:", error);
        const errMessage = getAxiosErrorMessage(error);
        toast.error(errMessage ?? "Account deletion failed. Please try again.");
      },
    });
  };

  return (
    <div className="p-8 max-w-xl mx-auto font-sans min-h-screen bg-background text-foreground transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Delete Account</h1>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone.
        </p>
      </div>

      <Card className="shadow-sm border border-border bg-card text-card-foreground">
        <CardContent className="pt-6 space-y-6">
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4 flex gap-3 text-red-900 dark:text-red-200">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                Deleting your account will permanently remove all your data,
                including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-red-800 dark:text-red-300">
                <li>Profile information</li>
                <li>Course progress</li>
                <li>Certificates</li>
                <li>Payments</li>
                <li>Saved data</li>
              </ul>
            </div>
          </div>

          <FormProvider {...form}>
            <form
              id="update-profile-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {fields.map(({ name, title, placeholder, Icon, type }) => (
                <div key={name} className="space-y-3 mt-5 mb-5">
                  <ValidationInput<TDeleteUserAccount>
                    fieldTitle={
                      <>
                        <span className="text-muted-foreground">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-gray-700 dark:text-gray-200">
                          {title}
                        </span>
                      </>
                    }
                    nameInSchema={name}
                    placeholder={placeholder}
                    className="h-10 rounded-xl"
                    type={type}
                    disabled={isPending}
                  />
                </div>
              ))}
            </form>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                form="update-profile-form"
                disabled={isPending || !form.formState.isValid}
                className="mt-2 h-10 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 font-medium"
              >
                {isPending ? "Loading…" : "Delete Account"}
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-accent hover:text-accent-foreground"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </CardFooter>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
