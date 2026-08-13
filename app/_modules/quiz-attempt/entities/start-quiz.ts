import { QuizAttemptStatus } from "./quiz-attempt";

export type StudentAttemptView = {
  attemptId: string;
  quizId: string;
  attemptNumber: number;
  status: QuizAttemptStatus;
  startedAt: string;
  expiresAt: string;
  durationMinutes: number;

  questions: Array<{
    id: string;
    text: string;
    order: number;

    choices: Array<{
      id: string;
      text: string;
    }>;

    selectedChoiceId: string | null;
  }>;
};
