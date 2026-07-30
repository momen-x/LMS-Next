"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { Question } from "../entity/question";

import CreateQuestion from "../views/create-question";
import UpdateQuestion from "../views/update-question";

interface QuestionDialogContextValue {
  openCreateQuestion: (quizId: string) => void;
  openUpdateQuestion: (question: Question) => void;
}

const QuestionDialogContext =
  createContext<QuestionDialogContextValue | null>(null);

export function useQuestionDialog() {
  const context = useContext(QuestionDialogContext);

  if (!context) {
    throw new Error(
      "useQuestionDialog must be used within a QuestionDialogProvider",
    );
  }

  return context;
}

interface QuestionDialogProviderProps {
  children: ReactNode;
}

export function QuestionDialogProvider({
  children,
}: QuestionDialogProviderProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [activeQuizId, setActiveQuizId] = useState<string | null>(
    null,
  );

  const [activeQuestion, setActiveQuestion] =
    useState<Question | null>(null);

  const openCreateQuestion = useCallback((quizId: string) => {
    setActiveQuizId(quizId);
    setCreateOpen(true);
  }, []);

  const openUpdateQuestion = useCallback(
    (question: Question) => {
      setActiveQuestion(question);
      setUpdateOpen(true);
    },
    [],
  );

  const handleCreateOpenChange = useCallback(
    (open: boolean) => {
      setCreateOpen(open);

      if (!open) {
        setActiveQuizId(null);
      }
    },
    [],
  );

  const handleUpdateOpenChange = useCallback(
    (open: boolean) => {
      setUpdateOpen(open);

      if (!open) {
        setActiveQuestion(null);
      }
    },
    [],
  );

  const contextValue = useMemo<QuestionDialogContextValue>(
    () => ({
      openCreateQuestion,
      openUpdateQuestion,
    }),
    [openCreateQuestion, openUpdateQuestion],
  );

  return (
    <QuestionDialogContext.Provider value={contextValue}>
      {children}

      <CreateQuestion
        open={createOpen}
        onOpenChange={handleCreateOpenChange}
        quizId={activeQuizId}
      />

      <UpdateQuestion
        open={updateOpen}
        onOpenChange={handleUpdateOpenChange}
        question={activeQuestion}
      />
    </QuestionDialogContext.Provider>
  );
}