import { CreateQuizData } from "../dto/create-quiz";
import { UpdateQuizData } from "../dto/update-quiz";
import { Quiz } from "../entity/quiz";

export interface IQuizAPI {
  create: (courseId: string, data: CreateQuizData) => Promise<Quiz>;
  getCourseQuizzes: (courseId: string) => Promise<Quiz[]>;
  getById: (quizId: string) => Promise<Quiz>;
  update: (quizId: string, data: UpdateQuizData) => Promise<Quiz>;
  delete: (quizId: string) => Promise<Quiz>;
}
