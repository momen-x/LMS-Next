"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import AttemptResult from "./attempt-result";
import SubmitQuizDialog from "./submit-quiz-dialog";

import { getErrorMessage } from "@/utils/get-axios-error-message";

import { Question } from "@/app/_modules/question/entity/question";
import { Choice } from "@/app/_modules/choice/entity/choice";

import { QuizAttempt } from "../entity/quiz-attempt";
import { useSaveAttemptAnswer } from "../hooks/useSaveAttemptAnswer";

import AttemptQuestionCard from "./attempt-question-card";
import QuestionNavigator from "./question-navigator";

import { useSubmitAttempt } from "../hooks/useSubmitAttempt";

export type AttemptQuestion = Question & {
  choices: Choice[];
};

type QuizPlayerProps = {
  attempt: QuizAttempt;
  quizTitle: string;
  passingScore: number;
  maxAttempts: number;
  attemptsCount: number;
  questions: AttemptQuestion[];
  initialAnswers?: Record<string, string>;
  onBackToQuiz: () => void;
  onTryAgain: () => void;
};
export default function QuizPlayer({
  attempt,
  quizTitle,
  passingScore,
  maxAttempts,
  attemptsCount,
  questions,
  initialAnswers = {},
  onBackToQuiz,
  onTryAgain,
}: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] =
    useState<Record<string, string>>(initialAnswers);

  const [savingChoiceId, setSavingChoiceId] = useState<string>();
  const [submittedAttempt, setSubmittedAttempt] = useState<QuizAttempt | null>(
    attempt.status === "submitted" ? attempt : null,
  );
  const { mutateAsync: submitAttempt, isPending: isSubmittingAttempt } =
    useSubmitAttempt();

  const { mutateAsync: saveAnswer, isPending: isSavingAnswer } =
    useSaveAttemptAnswer();

  const currentQuestion = questions[currentQuestionIndex];

  const answeredQuestionsCount = useMemo(
    () => questions.filter((question) => Boolean(answers[question.id])).length,
    [answers, questions],
  );
  const handleSubmitAttempt = async () => {
    try {
      const result = await submitAttempt(attempt.id);

      setSubmittedAttempt(result);

      toast.success("Quiz submitted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  if (submittedAttempt) {
    return (
      <AttemptResult
        attempt={submittedAttempt}
        passingScore={passingScore}
        canTryAgain={attemptsCount < maxAttempts}
        onBackToQuiz={onBackToQuiz}
        onTryAgain={onTryAgain}
      />
    );
  }
  if (questions.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          This quiz does not contain any questions.
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentQuestion) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          The requested question could not be loaded.
        </AlertDescription>
      </Alert>
    );
  }

  const handleSelectChoice = async (choiceId: string) => {
    const previousChoiceId = answers[currentQuestion.id];

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: choiceId,
    }));

    setSavingChoiceId(choiceId);

    try {
      await saveAnswer({
        attemptId: attempt.id,
        data: {
          questionId: currentQuestion.id,
          choiceId,
        },
      });
    } catch (error) {
      setAnswers((currentAnswers) => {
        const nextAnswers = { ...currentAnswers };

        if (previousChoiceId) {
          nextAnswers[currentQuestion.id] = previousChoiceId;
        } else {
          delete nextAnswers[currentQuestion.id];
        }

        return nextAnswers;
      });

      toast.error(getErrorMessage(error));
    } finally {
      setSavingChoiceId(undefined);
    }
  };

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Attempt {attempt.attemptNumber}
            </p>

            <h1 className="text-2xl font-bold">{quizTitle}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <CheckCircle2 className="size-4" />
              {answeredQuestionsCount} of {questions.length} answered
            </div>

            <SubmitQuizDialog
              answeredQuestions={answeredQuestionsCount}
              totalQuestions={questions.length}
              isSubmitting={isSubmittingAttempt}
              disabled={isSavingAnswer}
              onSubmit={handleSubmitAttempt}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <AttemptQuestionCard
          question={currentQuestion}
          choices={currentQuestion.choices}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedChoiceId={answers[currentQuestion.id]}
          savingChoiceId={savingChoiceId}
          isSaving={isSavingAnswer}
          onSelectChoice={handleSelectChoice}
          onPrevious={() =>
            setCurrentQuestionIndex((index) => Math.max(index - 1, 0))
          }
          onNext={() =>
            setCurrentQuestionIndex((index) =>
              Math.min(index + 1, questions.length - 1),
            )
          }
        />

        <aside>
          <QuestionNavigator
            questionIds={questions.map((question) => question.id)}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onSelectQuestion={setCurrentQuestionIndex}
          />
        </aside>
      </div>
    </div>
  );
}
