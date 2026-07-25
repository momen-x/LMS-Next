import { api } from "@/utils/axiosInstance";
import { CreateQuizData } from "../dto/create-quiz";
import { UpdateQuizData } from "../dto/update-quiz";
import { Quiz } from "../entity/quiz";
import { IQuizAPI } from "./quiz";

const BASE_URL = "/api/quizzes";

export const resQuiz: IQuizAPI = {
  create: async function (
    lessonId: string,
    data: CreateQuizData,
  ): Promise<Quiz> {
    const response = await api.post<Quiz>(
      `/api/lessons/${lessonId}/quizzes`,
      data,
    );

    return response.data;
  },
  getLessonQuizzes: async function (lessonId: string): Promise<Quiz[]> {
    const response = await api.get<Quiz[]>(`/api/lessons/${lessonId}/quizzes`);

    return response.data;
  },

  getById: async function (quizId: string): Promise<Quiz> {
    const response = await api.get<Quiz>(`${BASE_URL}/${quizId}`);

    return response.data;
  },

  update: async function (quizId: string, data: UpdateQuizData): Promise<Quiz> {
    const response = await api.patch<Quiz>(`${BASE_URL}/${quizId}`, data);

    return response.data;
  },

  delete: async function (quizId: string): Promise<Quiz> {
    const response = await api.delete<Quiz>(`${BASE_URL}/${quizId}`);

    return response.data;
  },
};
