import { AttemptAnswer } from "../entities/attempt-answer";
import { QuizAttempt } from "../entities/quiz-attempt";
import { TSaveAttemptAnswer } from "../dto/save-attempt-answer";
import { StudentAttemptView } from "../entities/start-quiz";

export interface IQuizAttemptAPI {
  startAttempt(quizId: string): Promise<StudentAttemptView>;

  saveAnswer(
    attemptId: string,
    questionId: string,
    data: TSaveAttemptAnswer,
  ): Promise<AttemptAnswer>;
  getAttempt(attemptId: string): Promise<StudentAttemptView>;

  submitAttempt(attemptId: string): Promise<QuizAttempt>;

  getMyAttempts(quizId: string): Promise<QuizAttempt[]>;
}
