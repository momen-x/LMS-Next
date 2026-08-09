import { useQuery } from "@tanstack/react-query";

import { resQuestionBank } from "../repo/resQuestionBank";
import { QUESTION_BANK_KEYS } from "./question-bank-keys";

export function useGetCourseQuestionBank(courseId: string) {
  return useQuery({
    queryKey: QUESTION_BANK_KEYS.course(courseId),
    queryFn: () => resQuestionBank.getCourseQuestionsBank(courseId),
    enabled: Boolean(courseId),
  });
}
