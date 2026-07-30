import { z } from "zod";

export const mediaTypes = ["video", "audio", "document"] as const;

export type MediaType = (typeof mediaTypes)[number];

export const createMediaSchema = z.object({
  type: z.enum(mediaTypes),
  duration: z.coerce.number().min(0).nullable().optional(),
  file: z
    .instanceof(File, {
      message: "Media file is required",
    })
    .refine((file) => file.size > 0, {
      message: "Media file is required",
    }),
});

export type TCreateMedia = z.infer<typeof createMediaSchema>;
