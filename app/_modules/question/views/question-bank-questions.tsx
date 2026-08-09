"use client";

import { AlertCircle, CircleHelp, Loader2, Plus } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import BackBtn from "@/components/sharing/back-btn";
import { getErrorMessage } from "@/utils/get-axios-error-message";

import { useQuestionDialog } from "../context/question-dialog-context";
import { useDeleteQuestion } from "../hooks/useDeleteQuestion";
import { useGetQuestionBankQuestions } from "../hooks/useGetQuestionBankQuestions";
import QuestionCard from "./question-card";

interface QuestionBankQuestionsProps {
  questionBankId: string;
}

export default function QuestionBankQuestions({
  questionBankId,
}: QuestionBankQuestionsProps) {
  const {
    data: questions,
    isPending,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetQuestionBankQuestions(questionBankId);
  const { openCreateQuestion } = useQuestionDialog();
  const { mutateAsync: deleteQuestion, isPending: isDeleting } =
    useDeleteQuestion();

  const handleDelete = async (questionId: string) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      await deleteQuestion({ questionId, questionBankId });
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error) ?? "Failed to delete question");
    }
  };

  if (isLoading) return <ListSkeleton />;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Questions</h1>
          <p className="text-sm text-muted-foreground">
            Manage the questions belonging to this question bank.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <BackBtn />
          <Button type="button" size="sm" onClick={() => openCreateQuestion(questionBankId)}>
            <Plus className="size-4" />
            Add question
          </Button>
        </div>
      </div>

      {isPending && (
        <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-center">
          <AlertCircle className="size-6 text-destructive" />
          <div>
            <p className="font-medium">Failed to load questions</p>
            <p className="text-sm text-muted-foreground">
              An error occurred while loading the question-bank questions.
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" disabled={isFetching} onClick={() => refetch()}>
            {isFetching && <Loader2 className="size-4 animate-spin" />}
            Try again
          </Button>
        </div>
      )}

      {!isPending && !isError && questions?.length === 0 && (
        <div className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-muted">
            <CircleHelp className="size-5 text-muted-foreground" />
          </div>
          <p className="font-medium">No questions yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            This question bank does not contain any questions. Add the first question to begin building it.
          </p>
          <Button type="button" size="sm" className="mt-4" onClick={() => openCreateQuestion(questionBankId)}>
            <Plus className="size-4" />
            Add question
          </Button>
        </div>
      )}

      {!isPending && !isError && Boolean(questions?.length) && (
        <div className="space-y-3">
          {questions?.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              isDeleting={isDeleting}
              onDelete={() => handleDelete(question.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
