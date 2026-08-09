import { CreateQuestionsBankData } from "../dto/questions-bank.dto";
import { QuestionsBank, ResQuestionsBank } from "../entity/question-bank";

export interface IQuestionsBankAPI {
  create: (
    courseId: string,
    data: CreateQuestionsBankData,
  ) => Promise<QuestionsBank>;
  getCourseQuestionsBank: (courseId: string) => Promise<ResQuestionsBank[]>;
  getById: (questionsBankId: string) => Promise<QuestionsBank>;
  update: (
    questionsBankId: string,
    data: CreateQuestionsBankData,
  ) => Promise<QuestionsBank>;
  delete: (questionsBankId: string) => Promise<QuestionsBank>;
}
