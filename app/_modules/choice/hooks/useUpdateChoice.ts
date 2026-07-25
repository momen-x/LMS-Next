import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateChoiceData } from "../dto/update-choice";
import { resChoice } from "../repo/res-choice";
import { CHOICE_KEYS } from "./choice-keys";

interface UpdateChoiceVariables {
  choiceId: string;
  questionId: string;
  data: UpdateChoiceData;
}

export function useUpdateChoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ choiceId, data }: UpdateChoiceVariables) =>
      resChoice.update(choiceId, data),

    onSuccess: (updatedChoice, variables) => {
      queryClient.setQueryData(
        CHOICE_KEYS.detail(variables.choiceId),
        updatedChoice,
      );

      queryClient.invalidateQueries({
        queryKey: CHOICE_KEYS.question(variables.questionId),
      });

      queryClient.invalidateQueries({
        queryKey: CHOICE_KEYS.list(),
      });
    },
  });
}
