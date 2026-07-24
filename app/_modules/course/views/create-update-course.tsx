/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import ValidationInput from "@/components/inputs/validation-input";

import { UpdateCourseData, updateCourseSchema } from "../dto/update-course";
import { CreateCourseData, createCourseSchema } from "../dto/create-course";
import ValidationTextarea from "@/components/inputs/validation-textarea";
import ValidationSelect from "@/components/inputs/validation-select";
import { useGetAllCategories } from "../../category/hooks/useGetAllCategories";
import { useCreateCourse } from "../hooks/useCreateCourse";
import { useUpdateCourse } from "../hooks/useUpdateCourse";
import { getErrorMessage } from "@/utils/get-axios-error-message";

const LEVEL_OPTIONS = [
  { id: "beginner", description: "Beginner" },
  { id: "intermediate", description: "Intermediate" },
  { id: "advanced", description: "Advanced" },
];

const LANGUAGE_OPTIONS = [
  { id: "en", description: "English" },
  { id: "sp", description: "Spanish" },
  { id: "ar", description: "Arabic" },
];

interface CourseFormProps {
  mode?: "create" | "edit";
  id?: string;
  initialData?: CreateCourseData | UpdateCourseData;
  onCancel?: () => void;
}

export default function CourseForm({
  mode = "create",
  id = "",
  initialData,
  onCancel,
}: CourseFormProps) {
  const router = useRouter();
  const isEditMode = mode === "edit";

  const form = useForm<CreateCourseData | UpdateCourseData>({
    resolver: zodResolver(
      isEditMode ? (updateCourseSchema as any) : (createCourseSchema as any),
    ),
    defaultValues: initialData ?? {
      categoryId: "",
      title: "",
      description: "",
      level: "beginner",
      language: "",
      price: 0,
      thumbnail: undefined,
    },
    mode: "onChange",
  });
  const { data: categories, isLoading } = useGetAllCategories();
  const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse();
  const onSubmit = async (data: CreateCourseData | UpdateCourseData) => {
    if (isEditMode) {
      if (id === "" || id === undefined) {
        toast.error("invalid id");
        return;
      }
      updateCourse(
        { id, data },
        {
          onSuccess: () => {
            toast.success("Course updated successfully");
            router.back();
          },
          onError: (err) => {
            const errMessage = getErrorMessage(err);
            toast.error(
              errMessage ?? "Something went wrong, field to update course",
            );
          },
        },
      );
    } else {
      createCourse(data as CreateCourseData, {
        onSuccess: () => {
          form.reset();
          toast.success("Course created successfully");
        },
        onError: (err) => {
          const errMessage = getErrorMessage(err);
          toast.error(
            errMessage ?? "Something went wrong, field to create course",
          );
        },
      });
    }
  };
  if (isLoading) return null;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditMode ? "Edit Course" : "Create New Course"}
        </h2>
        <p className="text-muted-foreground text-sm">
          {isEditMode
            ? "Update your existing course details and visibility status."
            : "Add a new course to the platform."}
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN: Course Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Course Information</h3>

              <ValidationInput<CreateCourseData | UpdateCourseData>
                fieldTitle="Title"
                nameInSchema="title"
                placeholder="Enter course title"
              />

              <ValidationTextarea<CreateCourseData | UpdateCourseData>
                fieldTitle="Description"
                nameInSchema="description"
                placeholder="Write course description..."
                className="min-h-37.5 max-w-full"
              />
            </div>

            {/* RIGHT COLUMN: Course Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Course Details</h3>
              {categories && categories.length > 0 ? (
                <ValidationSelect<CreateCourseData>
                  fieldTitle="Category"
                  nameInSchema="categoryId"
                  data={categories.map((category) => ({
                    id: category.id,
                    description: category.name,
                  }))}
                />
              ) : (
                <p className="mb-4">no Categories found </p>
              )}

              <ValidationSelect<CreateCourseData | UpdateCourseData>
                fieldTitle="Level"
                nameInSchema="level"
                data={LEVEL_OPTIONS}
              />

              <ValidationSelect<CreateCourseData | UpdateCourseData>
                fieldTitle="Language"
                nameInSchema="language"
                data={LANGUAGE_OPTIONS}
              />

              <ValidationInput<CreateCourseData | UpdateCourseData>
                fieldTitle="Price"
                nameInSchema="price"
                type="number"
                step="0.01"
                placeholder="0.00"
              />

              {/* Thumbnail — Controller since it's a File, not a plain text field */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Controller
                  name="thumbnail"
                  control={form.control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      {...field}
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  )}
                />
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 2MB
                </p>
                {form.formState.errors.thumbnail && (
                  <p className="text-xs font-medium text-destructive">
                    {form.formState.errors.thumbnail.message as string}
                  </p>
                )}
              </div>
            </div>
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
                  : "Create Course"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
