import { api } from "@/utils/axiosInstance";
import { ISectionAPI } from "./section";
import { CreateSectionData } from "../dto/create-section";
import { UpdateSectionData } from "../dto/update-section";
import { Section } from "../entity/section";

const BASE_URL = "/api/sections";

export const resSection: ISectionAPI = {
  getCourseSections: async function (courseId: string): Promise<Section[]> {
    const res = await api.get<Section[]>(`/api/courses/${courseId}/sections`);
    return res.data;
  },
  getSection: async function (id: string): Promise<Section> {
    const res = await api.get<Section>(`${BASE_URL}/${id}`);
    return res.data;
  },
  create: async function (
    courseId: string,
    data: CreateSectionData,
  ): Promise<Section> {
    const res = await api.post<Section>(
      `/api/courses/${courseId}/sections`,
      data,
    );
    return res.data;
  },
  update: async function (
    id: string,
    data: UpdateSectionData,
  ): Promise<Section> {
    const res = await api.patch<Section>(`${BASE_URL}/${id}`, data);
    return res.data;
  },
  delete: async function (id: string): Promise<Section> {
    const res = await api.delete<Section>(`${BASE_URL}/${id}`);
    return res.data;
  },
};
