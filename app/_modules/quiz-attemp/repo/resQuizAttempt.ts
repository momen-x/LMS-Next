import { api } from "@/utils/axiosInstance";

import { AttemptAnswer } from "../entity/attempt-answer";
import { QuizAttempt } from "../entity/quiz-attempt";
import { TSaveAttemptAnswer } from "../dto/save-attempt-answer";
import { IQuizAttemptAPI } from "./quiz-attempt";
import { SavedAttemptAnswer } from "../entity/saved-attempt-answer";

export const resQuizAttempt: IQuizAttemptAPI = {
  startAttempt: async function (quizId: string): Promise<QuizAttempt> {
    const { data } = await api.post<QuizAttempt>(`/api/quizzes/${quizId}/attempts`);

    return data;
  },

  saveAnswer: async function (
    attemptId: string,
    data: TSaveAttemptAnswer,
  ): Promise<AttemptAnswer> {
    const response = await api.put<AttemptAnswer>(
      `/api/quiz-attempts/${attemptId}/answers`,
      data,
    );

    return response.data;
  },

  submitAttempt: async function (attemptId: string): Promise<QuizAttempt> {
    const { data } = await api.post<QuizAttempt>(
      `/api/quiz-attempts/${attemptId}/submit`,
    );

    return data;
  },

  getMyAttempts: async function (quizId: string): Promise<QuizAttempt[]> {
    const { data } = await api.get<QuizAttempt[]>(
      `/api/quizzes/${quizId}/my-attempts`,
    );

    return data;
  },
  getAttemptAnswers: async function (
    attemptId: string,
  ): Promise<SavedAttemptAnswer[]> {
    const response = await api.get<SavedAttemptAnswer[]>(
      `/api/quiz-attempts/${attemptId}/answers`,
    );

    return response.data;
  },
};
