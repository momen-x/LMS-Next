import { Media } from "../entity/media";

import { TCreateMedia } from "../dto/create-media";
import { TUpdateMedia } from "../dto/update-media";
import { api } from "@/utils/axiosInstance";
import { IMediaAPI } from "./media";

const BASE_URL = "/api/media";

export const resMedia: IMediaAPI = {
  create: async function (lessonId: string, dto: TCreateMedia): Promise<Media> {
    const formData = new FormData();

    formData.append("file", dto.file);
    formData.append("type", dto.type);

    if (dto.duration !== undefined) {
      formData.append("duration", dto.duration.toString());
    }

    const { data } = await api.post<Media>(
      `/api/lessons/${lessonId}/media`,
      formData,
    );

    return data;
  },
  getLessonMedia: async function (lessonId: string): Promise<Media[]> {
    const { data } = await api.get<Media[]>(`/lessons/${lessonId}/media`);

    return data;
  },
  getById: async function (id: string): Promise<Media> {
    const { data } = await api.get<Media>(`/media/${id}`);

    return data;
  },

  update: async function (id: string, dto: TUpdateMedia): Promise<Media> {
    const formData = new FormData();

    if (dto.file) {
      formData.append("file", dto.file);
    }

    if (dto.type) {
      formData.append("type", dto.type);
    }

    if (dto.duration !== undefined) {
      formData.append("duration", dto.duration.toString());
    }

    const { data } = await api.patch<Media>(`${BASE_URL}/${id}`, formData);

    return data;
  },

  delete: async function (id: string): Promise<Media> {
    const { data } = await api.delete<Media>(`${BASE_URL}/${id}`);

    return data;
  },
};
