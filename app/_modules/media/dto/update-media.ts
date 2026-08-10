import { z } from "zod";
import { externalUrlSchema, mediaTypes } from "./create-media";

export const updateMediaSchema = z
  .object({
    type: z.enum(mediaTypes).optional(),
    duration: z.coerce.number().min(0).optional(),
    file: z.instanceof(File).optional(),
    url: externalUrlSchema.optional(),
  })
  .refine(
    (data) =>
      data.type !== undefined ||
      data.duration !== undefined ||
      data.file !== undefined ||
      data.url !== undefined,
    {
      message: "At least one field must be updated",
    },
  );

export type TUpdateMedia = z.infer<typeof updateMediaSchema>;
