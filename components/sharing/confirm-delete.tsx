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
import { deleteFields as fields } from "@/components/sharing/fields/delete";

import { getErrorMessage } from "@/utils/get-axios-error-message";
import { DeleteSchema, TDeleteForm } from "../../dto/delete";

interface DeleteEntityCardProps {
  id: string;
  title: string;
  description?: string;

  warningTitle?: string;
  impactedItems: string[];

  onDeleteSubmit: (id: string) => Promise<any> | void;
  isPending: boolean;
  successMessage?: string;
}

export default function DeleteEntityCard({
  id,
  title,
  description = "This action cannot be undone.",
  warningTitle,
  impactedItems,
  onDeleteSubmit,
  isPending,
  successMessage = "Deleted successfully",
}: DeleteEntityCardProps) {
  const router = useRouter();

  const form = useForm<TDeleteForm>({
    resolver: zodResolver(DeleteSchema as any),
    defaultValues: {
      delete: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: TDeleteForm) => {
    if (data.delete !== "DELETE") {
      toast.error("Must confirm delete");
      return;
    }
    try {
      await onDeleteSubmit(id);
      toast.success(successMessage);

      router.back();
    } catch (error) {
      console.error("Deletion error:", error);
      const errMessage = getErrorMessage(error);
      toast.error(errMessage ?? "Deletion failed. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto font-sans min-h-screen bg-background text-foreground transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Card className="shadow-sm border border-border bg-card text-card-foreground">
        <CardContent className="pt-6 space-y-6">
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4 flex gap-3 text-red-900 dark:text-red-200">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                {warningTitle ||
                  `Deleting this item will permanently remove all associated data, including:`}
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-red-800 dark:text-red-300">
                {impactedItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <FormProvider {...form}>
            <form
              id="delete-entity-form"
              onSubmit={form.handleSubmit(onSubmit as any)}
              className="space-y-6"
            >
              {fields.map(({ name, title, placeholder, Icon, type }) => (
                <div key={String(name)} className="space-y-3 mt-5 mb-5">
                  <ValidationInput<TDeleteForm>
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

            <CardFooter className="flex-col gap-2 p-0 pt-4">
              <Button
                type="submit"
                form="delete-entity-form"
                disabled={isPending || !form.formState.isValid}
                className="mt-2 h-10 w-full bg-red-600 text-white hover:bg-red-700 font-medium"
              >
                {isPending ? "Deleting…" : "Confirm Delete"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full border-border hover:bg-accent hover:text-accent-foreground"
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
