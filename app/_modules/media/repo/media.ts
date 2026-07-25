import { TCreateMedia } from "../dto/create-media";
import { TUpdateMedia } from "../dto/update-media";
import { Media } from "../entity/media";

export interface IMediaAPI {
  create: (lessonId: string, dto: TCreateMedia) => Promise<Media>;
  getLessonMedia: (lessonId: string) => Promise<Media[]>;
  getById: (id: string) => Promise<Media>;
  update: (id: string, dto: TUpdateMedia) => Promise<Media>;
  delete: (id: string) => Promise<Media>;
}
