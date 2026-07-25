import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateChoiceData } from "../dto/create-choice";
import { resChoice } from "../repo/res-choice";
import { CHOICE_KEYS } from "./choice-keys";

interface CreateChoiceVariables {
  questionId: string;
  data: CreateChoiceData;
}

export function useCreateChoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, data }: CreateChoiceVariables) =>
      resChoice.create(questionId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: CHOICE_KEYS.question(variables.questionId),
      });

      queryClient.invalidateQueries({
        queryKey: CHOICE_KEYS.list(),
      });
    },
  });
}
