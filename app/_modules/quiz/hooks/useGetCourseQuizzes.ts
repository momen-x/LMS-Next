import { useQuery } from "@tanstack/react-query";

import { resQuiz } from "../repo/resQuiz";
import { QUIZ_KEYS } from "./quiz-keys";

export function useGetCourseQuizzes(courseId: string) {
  return useQuery({
    queryKey: QUIZ_KEYS.course(courseId),
    queryFn: () => resQuiz.getCourseQuizzes(courseId),
    enabled: Boolean(courseId),
  });
}
