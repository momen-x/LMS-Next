/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import ValidationInput from "@/components/inputs/validation-input";

import {
  UpdateCategoryData,
  updateCategorySchema,
} from "../dto/update-category";
import {
  CreateCategoryData,
  createCategorySchema,
} from "../dto/create-category";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { useUpdateCategory } from "../hooks/useUpdateCategory";

import { getErrorMessage } from "@/utils/get-axios-error-message";
import { useRouter } from "next/navigation";

interface CategoryFormProps {
  mode?: "create" | "edit";
  id?: string;
  initialData?: CreateCategoryData | UpdateCategoryData;
  onCancel?: () => void;
}

export default function CategoryForm({
  mode = "create",
  id = "",
  initialData,
  onCancel,
}: CategoryFormProps) {
  const router = useRouter();
  const isEditMode = mode === "edit";

  const form = useForm<CreateCategoryData | UpdateCategoryData>({
    resolver: zodResolver(
      isEditMode
        ? (updateCategorySchema as any)
        : (createCategorySchema as any),
    ),
    defaultValues: initialData ?? {
      name: "",
      slug: "",
    },
    mode: "onChange",
  });
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const handleSubmit = (data: CreateCategoryData | UpdateCategoryData) => {
    if (isEditMode) {
      if (id === "" || id === undefined) {
        toast.error("invalid id");
        return;
      }
      updateCategory(
        {
          data: data as UpdateCategoryData,
          id,
        },
        {
          onSuccess: () => {
            toast.success("Category updated successfully");
            router.back();
          },
          onError: (error) => {
            const errMessage = getErrorMessage(error);
            toast.error(errMessage ?? "Failed to update category");
          },
        },
      );
    } else {
      createCategory(data as CreateCategoryData, {
        onSuccess: () => {
          toast.success("Category created successfully");
          form.reset();
        },
        onError: (error) => {
          const errorMessage = getErrorMessage(error);
          toast.error(errorMessage ?? "Failed to create category");
        },
      });
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditMode ? "Edit Category" : "Create New Category"}
        </h2>
        <p className="text-muted-foreground text-sm">
          {isEditMode
            ? "Update your existing category name and URL slug."
            : "Add a new category to organize your courses."}
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <ValidationInput<CreateCategoryData | UpdateCategoryData>
              fieldTitle="Category Name"
              nameInSchema="name"
              placeholder="e.g. Web Development"
            />

            <ValidationInput<CreateCategoryData | UpdateCategoryData>
              fieldTitle="Slug"
              nameInSchema="slug"
              placeholder="e.g. web-development"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating || isCreating || !form.formState.isValid}
            >
              {isEditMode
                ? isUpdating
                  ? "Updating..."
                  : "Save Changes"
                : isCreating
                  ? "Saving..."
                  : "Create Category"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
