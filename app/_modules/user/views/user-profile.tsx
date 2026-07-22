"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Calendar, Camera, Edit3, Loader2, Trash2, Upload } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LoadingPage from "@/app/loading";

import defaultUserImage from "@/public/assets/default-user1.png";

import transformingTheDateToATextString from "@/utils/from-date-to-string";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useUploadAvatar } from "../hooks/useUploadImage";

import { AUTHENTICATED_USER_ROUTES } from "../utile/constance";
import { useDeleteAvatar } from "../hooks/useDeleteUserAvatar";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_IMAGE_SIZE_MB = 5;

export default function UserProfile() {
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: user, isLoading } = useGetCurrentUser();

  const { mutate: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();

  const { mutate: deleteAvatar, isPending: isDeletingAvatar } =
    useDeleteAvatar();

  const isAvatarPending = isUploadingAvatar || isDeletingAvatar;

  const openFilePicker = () => {
    if (isAvatarPending) return;

    fileInputRef.current?.click();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error(
        "Please upload a valid image file (JPEG, PNG, WEBP, or GIF).",
      );

      resetFileInput();
      return;
    }

    const maxSizeInBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      toast.error(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`);

      resetFileInput();
      return;
    }

    uploadAvatar(
      { avatar: file },
      {
        onSuccess: () => {
          toast.success("Profile picture updated!");
          resetFileInput();
        },

        onError: () => {
          toast.error("Failed to update profile picture.");
          resetFileInput();
        },
      },
    );
  };

  const handleDeleteAvatar = () => {
    if (!user) return;
    if (!user.avatar || isAvatarPending) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove your profile picture?",
    );

    if (!confirmed) return;

    deleteAvatar(undefined, {
      onSuccess: () => {
        toast.success("Profile picture removed!");
      },

      onError: (error) => {
        console.error("Delete avatar error:", error);
        toast.error("Failed to remove profile picture.");
      },
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Something went wrong while loading your profile.
        </p>
      </div>
    );
  }

  const avatarSrc = user.avatar || defaultUserImage.src;

  const avatarFallback =
    user.name
      ?.trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "US";

  return (
    <div className="min-h-screen bg-background p-8 text-foreground transition-colors">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

          <p className="text-sm text-muted-foreground">
            Manage your personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="flex flex-col justify-between border-border bg-card text-card-foreground shadow-sm md:col-span-1">
            <CardContent className="flex flex-col items-center pt-6 text-center">
              <div className="relative mb-4">
                <Avatar className="h-28 w-28 border border-border">
                  <AvatarImage
                    src={avatarSrc}
                    alt={`${user.name}'s profile picture`}
                  />

                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  onClick={openFilePicker}
                  disabled={isAvatarPending}
                  aria-label="Upload profile picture"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-background shadow-md transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  id="avatar-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  disabled={isAvatarPending}
                  accept={ALLOWED_IMAGE_TYPES.join(",")}
                />
              </div>

              <h2 className="text-lg font-bold">{user.name}</h2>

              <Badge
                variant="secondary"
                className="mt-1 border-0 bg-blue-50 px-3 py-0.5 font-normal text-blue-600 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400"
              >
                {user.role}
              </Badge>

              <p className="mt-2 break-all text-sm text-muted-foreground">
                {user.email}
              </p>

              <DropdownMenu
                open={isAvatarMenuOpen}
                onOpenChange={setIsAvatarMenuOpen}
              >
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isAvatarPending}
                      className="mt-6 w-full border-border text-blue-600 hover:bg-accent hover:text-accent-foreground dark:text-blue-400"
                    />
                  }
                >
                  {isUploadingAvatar ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : isDeletingAvatar ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Removing...
                    </>
                  ) : (
                    "Edit Profile Picture"
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem
                    disabled={isAvatarPending}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);

                      // ننتظر حتى تُغلق القائمة، ثم نفتح نافذة الملفات.
                      window.setTimeout(() => {
                        openFilePicker();
                      }, 0);
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />

                    {user.avatar
                      ? "Upload new picture"
                      : "Upload profile picture"}
                  </DropdownMenuItem>

                  {user.avatar && (
                    <>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        disabled={isAvatarPending}
                        className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                        onClick={() => {
                          setIsAvatarMenuOpen(false);

                          window.setTimeout(() => {
                            handleDeleteAvatar();
                          }, 0);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove current picture
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>

            <div className="flex items-center gap-3 rounded-b-xl border-t border-border bg-card p-4 text-sm">
              <Calendar className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">Member since</p>

                <p className="font-medium">
                  {transformingTheDateToATextString(user.createdAt)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-border bg-card text-card-foreground shadow-sm md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
              <h3 className="text-base font-semibold">Personal Information</h3>

              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-accent hover:text-accent-foreground"
              >
                <Link
                  href={AUTHENTICATED_USER_ROUTES.updateProfile}
                  className="flex items-center gap-1.5"
                >
                  <Edit3 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  Edit
                </Link>
              </Button>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-6 pt-6 text-sm">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Full Name</p>

                <p className="font-medium">{user.name}</p>
              </div>

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Email</p>

                <p className="break-all font-medium">{user.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
