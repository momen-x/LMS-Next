import { Metadata } from "next";

import LessonQuizzes from "@/app/_modules/quiz/views/lesson-quizzes";
import { QuizDialogProvider } from "@/app/_modules/quiz/context/quiz-dialog-context";
import { TParams } from "@/types/params";

export const metadata: Metadata = {
  title: "Lesson details page",
  description: "This is the lesson details page",
};

const MangeQuizPage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <QuizDialogProvider>
      <LessonQuizzes lessonId={id} />
    </QuizDialogProvider>
  );
};

export default MangeQuizPage;
