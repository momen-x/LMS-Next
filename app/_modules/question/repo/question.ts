import { CreateQuestionData } from "../dto/create-question";
import { UpdateQuestionData } from "../dto/update-question";
import { Question } from "../entity/question";

export interface IQuestionAPI {
  create: (quizId: string, data: CreateQuestionData) => Promise<Question>;

  getQuizQuestions: (quizId: string) => Promise<Question[]>;

  getAll: () => Promise<Question[]>;

  getById: (questionId: string) => Promise<Question>;

  update: (questionId: string, data: UpdateQuestionData) => Promise<Question>;

  delete: (questionId: string) => Promise<Question>;
}
