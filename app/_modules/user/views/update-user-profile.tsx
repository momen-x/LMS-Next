/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ValidationInput from "@/components/inputs/validation-input";

import { useUpdateUsername } from "../hooks/useUpdateUsername";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

import { updateUserNameFields as fields } from "./fields/user-fields";
import { AUTHENTICATED_USER_ROUTES } from "../utile/constance";

import {
  TUpdateUsername,
  UpdateUsernameSchema,
} from "../dto/update-user-profile";

import {getErrorMessage} from "@/utils/get-axios-error-message";
import default_user_image from "@/public/assets/default-user1.png";
export default function UpdateUserProfile() {
  const router = useRouter();
  const { data: user, isLoading } = useGetCurrentUser();
  const form = useForm<TUpdateUsername>({
    resolver: zodResolver(UpdateUsernameSchema as any),
    defaultValues: {
      name: user?.name || "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    form.resetField("name", { defaultValue: user?.name || "" });
  }, [form, user]);
  const { mutate: updateUsername, isPending } = useUpdateUsername();
  const onSubmit = (data: TUpdateUsername) => {
    updateUsername(data, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        router.push(AUTHENTICATED_USER_ROUTES.profile);
        router.refresh();
      },
      onError: (error) => {
        const errMessage = getErrorMessage(error);
        toast.error(errMessage ?? "Profile update failed");
      },
    });
  };
  if (isLoading) return <>loading ...</>;
  if (!user) return null;

  const isUnchanged = user.name === form.watch("name");
  const isDisabled =
    form.formState.isSubmitting ||
    isPending ||
    !form.formState.isValid ||
    isUnchanged;
  return (
    <div className="p-8 max-w-3xl mx-auto font-sans min-h-screen bg-background text-foreground transition-colors">
      \{" "}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your personal information.
        </p>
      </div>
      <Card className="shadow-sm border border-border bg-card text-card-foreground">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            {/* Left Column: Avatar & Camera Icon */}
            <div className="flex md:flex-col items-center md:items-start gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border border-border">
                  <AvatarImage
                    src={user.avatar || default_user_image.src}
                    alt={user.name}
                  />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <FormProvider {...form}>
                <form
                  id="update-profile-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {fields.map(({ name, title, placeholder, Icon, type }) => (
                    <div key={name} className="space-y-3 mt-5 mb-5">
                      <ValidationInput<TUpdateUsername>
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
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-xs text-muted-foreground font-normal"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      className="bg-background border-input focus-visible:ring-ring"
                      disabled
                    />
                  </div>
                </form>
                <CardFooter className="flex-col gap-2">
                  <Button
                    type="submit"
                    form="update-profile-form"
                    disabled={isDisabled}
                    className="mt-2 h-10 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 font-medium"
                  >
                    {isPending ? "Loading…" : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border hover:bg-accent hover:text-accent-foreground"
                    onClick={() => router.back()}
                  >
                    Cancel and back profile
                  </Button>
                </CardFooter>
              </FormProvider>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
