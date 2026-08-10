/* eslint-disable react-hooks/incompatible-library */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createMediaSchema,
  mediaTypes,
  TCreateMedia,
} from "../dto/create-media";

interface MediaFormProps {
  defaultValues?: Partial<TCreateMedia>;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (data: TCreateMedia) => Promise<void> | void;
}

export default function MediaForm({
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
}: MediaFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<TCreateMedia>({
    resolver: zodResolver(createMediaSchema as any),
    mode: "onChange",
    defaultValues: {
      type: defaultValues?.type ?? "video",
      duration: defaultValues?.duration,
      url: defaultValues?.url ?? "",
    },
  });

  const selectedFile = watch("file");
  const selectedType = watch("type");

  const submit = (data: TCreateMedia) => {
    return onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="media-type">Media type</Label>

        <select
          id="media-type"
          disabled={isPending}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          {...register("type", {
            onChange: (event) => {
              const type = event.target.value;
              setValue("file", undefined, { shouldValidate: true });
              setValue("url", "", { shouldValidate: type === "url" });

              if (type === "url") {
                setValue("duration", undefined);
              }
            },
          })}
        >
          {mediaTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {errors.type && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
      </div>

      {selectedType !== "url" && <div className="space-y-2">
        <Label htmlFor="media-duration">Duration (seconds)</Label>

        <Input
          id="media-duration"
          type="number"
          min={0}
          step={1}
          placeholder="600"
          disabled={isPending}
          {...register("duration")}
        />

        {errors.duration && (
          <p className="text-sm text-destructive">{errors.duration.message}</p>
        )}
      </div>}

      {selectedType === "url" ? (
        <div className="space-y-2">
          <Label htmlFor="media-url">External URL</Label>

          <Input
            id="media-url"
            type="url"
            placeholder="https://example.com/resource"
            disabled={isPending}
            {...register("url")}
          />

          {errors.url && (
            <p className="text-sm text-destructive">{errors.url.message}</p>
          )}
        </div>
      ) : <div className="space-y-2">
        <Label htmlFor="media-file">Media file</Label>

        <Input
          id="media-file"
          type="file"
          disabled={isPending}
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              setValue("file", file, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }
          }}
        />

        {selectedFile && (
          <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm">
            <Upload className="size-4" />

            <span className="truncate">{selectedFile.name}</span>
          </div>
        )}

        {errors.file && (
          <p className="text-sm text-destructive">{errors.file.message}</p>
        )}
      </div>}

      <div className="flex justify-end border-t pt-5">
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending && <Loader2 className="size-4 animate-spin" />}

          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
