import { api } from "@/utils/axiosInstance";
import { IQuizAttemptAPI } from "./quiz-attempt";
import { StudentAttemptView } from "../entities/start-quiz";
import { TSaveAttemptAnswer } from "../dto/save-attempt-answer";
import { AttemptAnswer } from "../entities/attempt-answer";
import { QuizAttempt } from "../entities/quiz-attempt";

export const resQuizAttempt: IQuizAttemptAPI = {
  startAttempt: async function (quizId: string): Promise<StudentAttemptView> {
    const { data } = await api.post<StudentAttemptView>(
      `/api/quizzes/${quizId}/attempts`,
    );

    return data;
  },

  getAttempt: async function (attemptId: string): Promise<StudentAttemptView> {
    const { data } = await api.get<StudentAttemptView>(
      `/api/quiz-attempts/${attemptId}`,
    );

    return data;
  },

  saveAnswer: async function (
    attemptId: string,
    questionId: string,
    data: TSaveAttemptAnswer,
  ): Promise<AttemptAnswer> {
    const { data: savedAnswer } = await api.put<AttemptAnswer>(
      `/api/quiz-attempts/${attemptId}/answers/${questionId}`,
      data,
    );

    return savedAnswer;
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
};
