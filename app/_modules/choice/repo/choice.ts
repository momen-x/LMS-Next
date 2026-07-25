import { CreateChoiceData } from "../dto/create-choice";
import { UpdateChoiceData } from "../dto/update-choice";
import { Choice } from "../entity/choice";

export interface IChoiceAPI {
  create: (questionId: string, data: CreateChoiceData) => Promise<Choice>;

  getQuestionChoices: (questionId: string) => Promise<Choice[]>;

  getAll: () => Promise<Choice[]>;

  getById: (choiceId: string) => Promise<Choice>;

  update: (choiceId: string, data: UpdateChoiceData) => Promise<Choice>;

  delete: (choiceId: string) => Promise<Choice>;
}
