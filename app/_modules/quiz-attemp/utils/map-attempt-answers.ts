import { SavedAttemptAnswer } from "../entity/saved-attempt-answer";

export default function mapAttemptAnswers(
  answers: SavedAttemptAnswer[],
): Record<string, string> {
  return answers.reduce<Record<string, string>>((result, answer) => {
    result[answer.questionId] = answer.choiceId;

    return result;
  }, {});
}
