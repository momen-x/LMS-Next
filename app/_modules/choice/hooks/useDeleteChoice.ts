import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resChoice } from "../repo/res-choice";
import { CHOICE_KEYS } from "./choice-keys";

interface DeleteChoiceVariables {
  choiceId: string;
  questionId: string;
}

export function useDeleteChoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ choiceId }: DeleteChoiceVariables) =>
      resChoice.delete(choiceId),

    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: CHOICE_KEYS.detail(variables.choiceId),
      });

      queryClient.invalidateQueries({
        queryKey: CHOICE_KEYS.question(variables.questionId),
      });

      queryClient.invalidateQueries({
        queryKey: CHOICE_KEYS.list(),
      });
    },
  });
}
