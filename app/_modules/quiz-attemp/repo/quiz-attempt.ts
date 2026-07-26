import { AttemptAnswer } from "../entity/attempt-answer";
import { QuizAttempt } from "../entity/quiz-attempt";
import { TSaveAttemptAnswer } from "../dto/save-attempt-answer";
import { SavedAttemptAnswer } from "../entity/saved-attempt-answer";

export interface IQuizAttemptAPI {
  startAttempt(quizId: string): Promise<QuizAttempt>;

  saveAnswer(
    attemptId: string,
    data: TSaveAttemptAnswer,
  ): Promise<AttemptAnswer>;

  submitAttempt(attemptId: string): Promise<QuizAttempt>;

  getMyAttempts(quizId: string): Promise<QuizAttempt[]>;
  getAttemptAnswers(attemptId: string): Promise<SavedAttemptAnswer[]>;
}
