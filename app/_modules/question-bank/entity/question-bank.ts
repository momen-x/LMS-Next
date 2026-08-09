export interface QuestionsBank {
  id: string;
  title: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResQuestionsBank {
  questionsBank: QuestionsBank;
  questionCount: number;
}
