import { useQuery } from "@tanstack/react-query";

import { resQuiz } from "../repo/resQuiz";
import { QUIZ_KEYS } from "./quiz-keys";

export function useGetLessonQuizzes(lessonId: string) {
  return useQuery({
    queryKey: QUIZ_KEYS.lesson(lessonId),
    queryFn: () => resQuiz.getLessonQuizzes(lessonId),
    enabled: Boolean(lessonId),
  });
}
