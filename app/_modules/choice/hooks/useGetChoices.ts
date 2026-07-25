import { useQuery } from "@tanstack/react-query";

import { resChoice } from "../repo/res-choice";
import { CHOICE_KEYS } from "./choice-keys";

export function useGetChoices() {
  return useQuery({
    queryKey: CHOICE_KEYS.list(),
    queryFn: resChoice.getAll,
  });
}
