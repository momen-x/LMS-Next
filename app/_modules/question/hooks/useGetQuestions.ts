import { useQuery } from "@tanstack/react-query";

import { resQuestion } from "../repo/resQuestion";
import { QUESTION_KEYS } from "./question-keys";

export function useGetQuestions() {
  return useQuery({
    queryKey: QUESTION_KEYS.list(),
    queryFn: resQuestion.getAll,
  });
}
