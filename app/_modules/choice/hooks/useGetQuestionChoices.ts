import { useQuery } from "@tanstack/react-query";

import { resChoice } from "../repo/res-choice";
import { CHOICE_KEYS } from "./choice-keys";

export function useGetQuestionChoices(questionId: string) {
  return useQuery({
    queryKey: CHOICE_KEYS.question(questionId),
    queryFn: () => resChoice.getQuestionChoices(questionId),
    enabled: Boolean(questionId),
  });
}
