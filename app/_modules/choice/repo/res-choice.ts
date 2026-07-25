import { api } from "@/utils/axiosInstance";

import { CreateChoiceData } from "../dto/create-choice";
import { UpdateChoiceData } from "../dto/update-choice";
import { Choice } from "../entity/choice";

import { IChoiceAPI } from "./choice";

const BASE_URL = "/api/choices";

export const resChoice: IChoiceAPI = {
  create: async function (
    questionId: string,
    data: CreateChoiceData,
  ): Promise<Choice> {
    const response = await api.post<Choice>(
      `/api/questions/${questionId}/choices`,
      data,
    );

    return response.data;
  },

  getQuestionChoices: async function (questionId: string): Promise<Choice[]> {
    const response = await api.get<Choice[]>(
      `/api/questions/${questionId}/choices`,
    );

    return response.data;
  },

  getAll: async function (): Promise<Choice[]> {
    const response = await api.get<Choice[]>(BASE_URL);

    return response.data;
  },

  getById: async function (choiceId: string): Promise<Choice> {
    const response = await api.get<Choice>(`${BASE_URL}/${choiceId}`);

    return response.data;
  },

  update: async function (
    choiceId: string,
    data: UpdateChoiceData,
  ): Promise<Choice> {
    const response = await api.patch<Choice>(`${BASE_URL}/${choiceId}`, data);

    return response.data;
  },

  delete: async function (choiceId: string): Promise<Choice> {
    const response = await api.delete<Choice>(`${BASE_URL}/${choiceId}`);

    return response.data;
  },
};
