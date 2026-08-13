"use client";

import {
  Mail,
  Shield,
  Calendar,
  Clock,
  BadgeCheck,
  BadgeX,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useGetUserById } from "../hooks/useGetUserById";

import defaultUserImage from "@/public/assets/default-user1.png";
import transformingTheDateToATextString from "@/utils/from-date-to-string";
import Link from "next/link";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import QueryErrorState from "@/components/sharing/query-error-state";
import NoData from "@/components/sharing/no-data";
import BackBtn from "@/components/sharing/back-btn";
import { useGetUserCertificates } from "../../certificate/hooks/useGetUserCertificates";
import UserCertificates from "../../certificate/views/user-certificates";

const UsersDetails = ({ userId }: { userId: string }) => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetUserById(userId);
  const {
    data: certificates = [],
    isPending: isCertificatesPending,
    isError: isCertificatesError,
    isFetching: isCertificatesFetching,
    refetch: refetchCertificates,
  } = useGetUserCertificates(userId);

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load user details"
        description="We couldn’t load the user details. Please try again"
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  if (!user) {
    return <NoData />;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <BackBtn />
        <Link href={`/admin-dashboard/users/${user.id}/delete`}>
          <Button variant={"destructive"}>
            <Trash className="h-4 w-4" />
            Delete User
          </Button>
        </Link>
      </div>
      <Card className="border-border bg-card text-card-foreground shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 pt-6 text-center sm:flex-row sm:items-start sm:text-left">
          <Avatar className="h-20 w-20 border border-border">
            <AvatarImage
              src={user.avatar || defaultUserImage.src}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name?.slice(0, 2).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <h1 className="text-xl font-bold tracking-tight">{user.name}</h1>
              <Badge
                variant="secondary"
                className="border-0 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
              >
                {user.role}
              </Badge>
              {user.isVerified ? (
                <Badge className="gap-1 border-0 bg-emerald-500/10 text-emerald-500">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified
                </Badge>
              ) : (
                <Badge className="gap-1 border-0 bg-rose-500/10 text-rose-500">
                  <BadgeX className="h-3.5 w-3.5" />
                  Unverified
                </Badge>
              )}
            </div>

            <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:justify-start">
              Signed up with {user.provider}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Info grid */}
      <Card className="border-border bg-card text-card-foreground shadow-sm">
        <CardContent className="grid grid-cols-1 gap-6 pt-6 text-sm sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p className="break-all font-medium">{user.id}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Last login</p>
              <p className="font-medium">
                {user.lastLogin
                  ? transformingTheDateToATextString(user.lastLogin)
                  : "Never logged in"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Joined</p>
              <p className="font-medium">
                {transformingTheDateToATextString(user.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Last updated</p>
              <p className="font-medium">
                {transformingTheDateToATextString(user.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <UserCertificates
          title="Student Certificates"
          description="Certificates earned by this student."
        />
      </Card>
    </div>
  );
};

export default UsersDetails;
