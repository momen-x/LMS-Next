import { Metadata } from "next";

import { QuizDialogProvider } from "@/app/_modules/quiz/context/quiz-dialog-context";
import CourseQuizzes from "@/app/_modules/quiz/views/course-quizzes";
import { TParams } from "@/types/params";

export const metadata: Metadata = {
  title: "Course quizzes",
  description: "Manage quizzes for this course",
};

export default async function CourseQuizzesPage({ params }: TParams) {
  const { id } = await params;

  return (
    <QuizDialogProvider courseId={id}>
      <CourseQuizzes courseId={id} />
    </QuizDialogProvider>
  );
}
