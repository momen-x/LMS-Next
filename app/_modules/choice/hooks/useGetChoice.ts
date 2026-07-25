import { useQuery } from "@tanstack/react-query";

import { resChoice } from "../repo/res-choice";
import { CHOICE_KEYS } from "./choice-keys";

export function useGetChoice(choiceId: string) {
  return useQuery({
    queryKey: CHOICE_KEYS.detail(choiceId),
    queryFn: () => resChoice.getById(choiceId),
    enabled: Boolean(choiceId),
  });
}
