import { MediaType } from "../dto/create-media";

export interface Media  {
  id: string;
  lessonId: string;
  url: string;
  urlPublicId: string | null;
  type: MediaType;
  duration: number | null;
  createdAt: string;
  updatedAt: string;
};