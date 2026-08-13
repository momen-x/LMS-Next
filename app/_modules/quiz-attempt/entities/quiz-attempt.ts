export type QuizAttemptStatus = "in_progress" | "submitted";

export interface QuizAttempt  {
  id: string;
  studentId: string;
  quizId: string;
  attemptNumber: number;
  status: QuizAttemptStatus;
  score: number | null;
  earnedMark: number | null;
  correctAnswers: number | null;
  totalQuestions: number | null;
  startedAt: string;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
