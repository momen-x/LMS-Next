/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import ValidationInput from "@/components/inputs/validation-input";

import { useUpdatePassword } from "../hooks/useUpdatePassword";

import { updateUserPasswordFields as fields } from "./fields/user-fields";
import { AUTHENTICATED_USER_ROUTES } from "../utile/constance";

import {
  TUpdatePassword,
  UpdatePasswordSchema,
} from "../dto/update-user-profile";

import getAxiosErrorMessage from "@/utils/get-axios-error-message";

export default function UpdateUserPassword() {
  const router = useRouter();
  const form = useForm<TUpdatePassword>({
    resolver: zodResolver(UpdatePasswordSchema as any),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const onSubmit = (data: TUpdatePassword) => {
    updatePassword(
      { password: data.password, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Password updated successfully");
          router.push(AUTHENTICATED_USER_ROUTES.profile);
          router.refresh();
        },
        onError: (error) => {
          const errMessage = getAxiosErrorMessage(error);
          toast.error(errMessage ?? "Password update failed");
        },
      },
    );
  };
  return (
    <div className="p-8 max-w-2xl mx-auto font-sans min-h-screen bg-background text-foreground transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Change Password</h1>
        <p className="text-sm text-muted-foreground">
          Update your password regularly to keep your account secure.
        </p>
      </div>

      <Card className="shadow-sm border border-border bg-card text-card-foreground">
        <CardContent className="pt-6 space-y-6">
          <FormProvider {...form}>
            <form
              id="update-password-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {fields.map(({ name, title, placeholder, Icon, type }) => (
                <div key={name} className="space-y-3 mt-5 mb-5">
                  <ValidationInput<TUpdatePassword>
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
                form="update-password-form"
                disabled={isPending || !form.formState.isValid}
                className="mt-2 h-10 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 font-medium"
              >
                {isPending ? "Loading…" : "Save Changes"}
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
