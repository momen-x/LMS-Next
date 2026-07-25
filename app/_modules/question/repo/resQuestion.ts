import { api } from "@/utils/axiosInstance";

import { CreateQuestionData } from "../dto/create-question";
import { UpdateQuestionData } from "../dto/update-question";
import { Question } from "../entity/question";

import { IQuestionAPI } from "./question";

const BASE_URL = "/api/questions";

export const resQuestion: IQuestionAPI = {
  create: async function (
    quizId: string,
    data: CreateQuestionData,
  ): Promise<Question> {
    const response = await api.post<Question>(
      `/api/quizzes/${quizId}/questions`,
      data,
    );

    return response.data;
  },

  getQuizQuestions: async function (quizId: string): Promise<Question[]> {
    const response = await api.get<Question[]>(
      `/api/quizzes/${quizId}/questions`,
    );

    return response.data;
  },

  getAll: async function (): Promise<Question[]> {
    const response = await api.get<Question[]>(BASE_URL);

    return response.data;
  },

  getById: async function (questionId: string): Promise<Question> {
    const response = await api.get<Question>(`${BASE_URL}/${questionId}`);

    return response.data;
  },

  update: async function (
    questionId: string,
    data: UpdateQuestionData,
  ): Promise<Question> {
    const response = await api.patch<Question>(
      `${BASE_URL}/${questionId}`,
      data,
    );

    return response.data;
  },

  delete: async function (questionId: string): Promise<Question> {
    const response = await api.delete<Question>(`${BASE_URL}/${questionId}`);

    return response.data;
  },
};
