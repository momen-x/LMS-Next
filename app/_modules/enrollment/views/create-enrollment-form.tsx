/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getErrorMessage } from "@/utils/get-axios-error-message";

import {
  createEnrollmentSchema,
  type CreateEnrollmentInput,
} from "../dto/create-enrollment";
import { useCreateEnrollment } from "../hooks/useCreateEnrollment";

type CreateEnrollmentFormProps = {
  courseId: string;
};

export default function CreateEnrollmentForm({
  courseId,
}: CreateEnrollmentFormProps) {
  const { mutateAsync, isPending } = useCreateEnrollment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEnrollmentInput>({
    resolver: zodResolver(createEnrollmentSchema as any),
    defaultValues: {
      userId: "",
    },
  });

  async function onSubmit(input: CreateEnrollmentInput) {
    try {
      await mutateAsync({
        courseId,
        input,
      });

      toast.success("User enrolled successfully");
      reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border p-5"
    >
      <div>
        <h2 className="text-lg font-semibold">Add enrollment</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Enter the user ID to enroll them in this course.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="enrollment-user-id">User ID</Label>

        <Input
          id="enrollment-user-id"
          placeholder="Enter user ID"
          disabled={isPending}
          {...register("userId")}
        />

        {errors.userId?.message && (
          <p className="text-sm text-destructive">{errors.userId.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending || !courseId}>
        {isPending ? "Enrolling..." : "Enroll user"}
      </Button>
    </form>
  );
}
