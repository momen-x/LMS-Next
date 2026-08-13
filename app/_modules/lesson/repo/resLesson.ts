import { api } from "@/utils/axiosInstance";
import { CreateLessonData } from "../dto/create-lesson";
import { UpdateLessonData } from "../dto/update-lesson";
import { Lesson } from "../entity/lesson";
import { ILessonAPI, LessonsResponse } from "./lesson";

const BASE_URL = "/api/lessons";

export const resLesson: ILessonAPI = {
  getLesson: async function (lessonId: string): Promise<Lesson> {
    const res = await api.get<Lesson>(`${BASE_URL}/${lessonId}`);
    return res.data;
  },
  getSectionLessons: async function (sectionId: string): Promise<Lesson[]> {
    const res = await api.get<Lesson[]>(`/api/sections/${sectionId}/lessons`);
    return res.data;
  },
  create: async function (
    sectionId: string,
    data: CreateLessonData,
  ): Promise<Lesson> {
    const res = await api.post<Lesson>(
      `/api/sections/${sectionId}/lessons`,
      data,
    );
    return res.data;
  },
  update: async function (
    lessonId: string,
    data: UpdateLessonData,
  ): Promise<Lesson> {
    const res = await api.patch<Lesson>(`${BASE_URL}/${lessonId}`, data);
    return res.data;
  },
  delete: async function (lessonId: string): Promise<Lesson> {
    const res = await api.delete<Lesson>(`${BASE_URL}/${lessonId}`);
    return res.data;
  },
  getIsPreviewLessons: async function (
    courseId: string,
  ): Promise<LessonsResponse> {
    const res = await api.get<LessonsResponse>(
      `/api/courses/${courseId}/preview-lessons`,
    );
    return res.data;
  },
};
