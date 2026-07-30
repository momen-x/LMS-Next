"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { Choice } from "../entity/choice";

import CreateChoice from "../views/create-choice";
import UpdateChoice from "../views/update-choice";

interface CreateChoicePayload {
  questionId: string;
  choicesCount: number;
}

interface ChoiceDialogContextValue {
  openCreateChoice: (questionId: string, choicesCount: number) => void;

  openUpdateChoice: (choice: Choice) => void;
}

const ChoiceDialogContext = createContext<ChoiceDialogContextValue | null>(
  null,
);

export function useChoiceDialog() {
  const context = useContext(ChoiceDialogContext);

  if (!context) {
    throw new Error(
      "useChoiceDialog must be used within a ChoiceDialogProvider",
    );
  }

  return context;
}

interface ChoiceDialogProviderProps {
  children: ReactNode;
}

export function ChoiceDialogProvider({ children }: ChoiceDialogProviderProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [createPayload, setCreatePayload] =
    useState<CreateChoicePayload | null>(null);

  const [activeChoice, setActiveChoice] = useState<Choice | null>(null);

  const openCreateChoice = useCallback(
    (questionId: string, choicesCount: number) => {
      if (choicesCount >= 5) {
        return;
      }

      setCreatePayload({
        questionId,
        choicesCount,
      });

      setCreateOpen(true);
    },
    [],
  );

  const openUpdateChoice = useCallback((choice: Choice) => {
    setActiveChoice(choice);
    setUpdateOpen(true);
  }, []);

  const handleCreateOpenChange = useCallback((open: boolean) => {
    setCreateOpen(open);

    if (!open) {
      setCreatePayload(null);
    }
  }, []);

  const handleUpdateOpenChange = useCallback((open: boolean) => {
    setUpdateOpen(open);

    if (!open) {
      setActiveChoice(null);
    }
  }, []);

  const contextValue = useMemo<ChoiceDialogContextValue>(
    () => ({
      openCreateChoice,
      openUpdateChoice,
    }),
    [openCreateChoice, openUpdateChoice],
  );

  return (
    <ChoiceDialogContext.Provider value={contextValue}>
      {children}

      <CreateChoice
        open={createOpen}
        onOpenChange={handleCreateOpenChange}
        questionId={createPayload?.questionId ?? null}
        choicesCount={createPayload?.choicesCount ?? 0}
      />

      <UpdateChoice
        open={updateOpen}
        onOpenChange={handleUpdateOpenChange}
        choice={activeChoice}
      />
    </ChoiceDialogContext.Provider>
  );
}
