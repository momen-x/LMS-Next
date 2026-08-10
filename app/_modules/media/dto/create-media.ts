import { z } from "zod";

export const mediaTypes = ["video", "audio", "document", "url"] as const;

export type MediaType = (typeof mediaTypes)[number];

export const externalUrlSchema = z
  .url("A valid URL is required")
  .refine((value) => ["http:", "https:"].includes(new URL(value).protocol), {
    message: "URL must start with http:// or https://",
  });

export const createMediaSchema = z
  .object({
    type: z.enum(mediaTypes),
    duration: z.coerce.number().min(0).nullable().optional(),
    file: z.instanceof(File).optional(),
    url: z.string().trim().optional(),
  })
  .superRefine((data, context) => {
    if (data.type === "url") {
      const parsedUrl = externalUrlSchema.safeParse(data.url);

      if (!parsedUrl.success) {
        context.addIssue({
          code: "custom",
          path: ["url"],
          message: parsedUrl.error.issues[0]?.message ?? "A valid URL is required",
        });
      }
      return;
    }

    if (!data.file || data.file.size === 0) {
      context.addIssue({
        code: "custom",
        path: ["file"],
        message: "Media file is required",
      });
    }
  });

export type TCreateMedia = z.infer<typeof createMediaSchema>;
