"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { QuestionsBank } from "../entity/question-bank";

import CreateQuestionBank from "../views/create-questions-bank";
import UpdateQuestionBank from "../views/update-questions-bank";

interface QuestionsBankDialogContextValue {
  openCreateQuestionsBank: (CourseId: string) => void;
  openUpdateQuestionsBank: (questionsBank: QuestionsBank) => void;
}

const QuestionsBankDialogContext =
  createContext<QuestionsBankDialogContextValue | null>(null);

export function useQuestionsBankDialog() {
  const context = useContext(QuestionsBankDialogContext);

  if (!context) {
    throw new Error(
      "useQuestionsBankDialog must be used within a QuestionsBankDialogProvider",
    );
  }

  return context;
}

interface QuestionsBankDialogProviderProps {
  children: ReactNode;
}

export function QuestionsBankDialogProvider({
  children,
}: QuestionsBankDialogProviderProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const [activeQuestionsBank, setActiveQuestionsBank] =
    useState<QuestionsBank | null>(null);

  const openCreateQuestionsBank = useCallback((CourseId: string) => {
    setActiveCourseId(CourseId);
    setCreateOpen(true);
  }, []);

  const openUpdateQuestionsBank = useCallback(
    (questionsBank: QuestionsBank) => {
      setActiveQuestionsBank(questionsBank);
      setUpdateOpen(true);
    },
    [],
  );

  const handleCreateOpenChange = useCallback((open: boolean) => {
    setCreateOpen(open);

    if (!open) {
      setActiveCourseId(null);
    }
  }, []);

  const handleUpdateOpenChange = useCallback((open: boolean) => {
    setUpdateOpen(open);

    if (!open) {
      setActiveQuestionsBank(null);
    }
  }, []);

  const contextValue = useMemo<QuestionsBankDialogContextValue>(
    () => ({
      openCreateQuestionsBank,
      openUpdateQuestionsBank,
    }),
    [openCreateQuestionsBank, openUpdateQuestionsBank],
  );

  return (
    <QuestionsBankDialogContext.Provider value={contextValue}>
      {children}
      {activeCourseId && (
        <CreateQuestionBank
          open={createOpen}
          onOpenChange={handleCreateOpenChange}
          courseId={activeCourseId}
        />
      )}
      {activeQuestionsBank && (
        <UpdateQuestionBank
          open={updateOpen}
          onOpenChange={handleUpdateOpenChange}
          questionsBank={activeQuestionsBank}
        />
      )}{" "}
    </QuestionsBankDialogContext.Provider>
  );
}
