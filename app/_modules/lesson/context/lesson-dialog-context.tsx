"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import CreateLessonDialog from "../views/create-lesson";
import UpdateLessonDialog from "../views/update-lesson";

type LessonDialogContextValue = {
  openCreateLesson: (sectionId: string) => void;
  openUpdateLesson: (lessonId: string) => void;
};

const LessonDialogContext = createContext<LessonDialogContextValue | null>(
  null,
);

export function useLessonDialog() {
  const context = useContext(LessonDialogContext);

  if (!context) {
    throw new Error(
      "useLessonDialog must be used within a LessonDialogProvider",
    );
  }

  return context;
}

export function LessonDialogProvider({ children }: { children: ReactNode }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const openCreateLesson = useCallback((sectionId: string) => {
    setActiveSectionId(sectionId);
    setCreateOpen(true);
  }, []);

  const openUpdateLesson = useCallback((lessonId: string) => {
    setActiveLessonId(lessonId);
    setUpdateOpen(true);
  }, []);

  const handleCreateOpenChange = useCallback((open: boolean) => {
    setCreateOpen(open);

    if (!open) {
      setActiveSectionId(null);
    }
  }, []);

  const handleUpdateOpenChange = useCallback((open: boolean) => {
    setUpdateOpen(open);

    if (!open) {
      setActiveLessonId(null);
    }
  }, []);

  const contextValue = useMemo<LessonDialogContextValue>(
    () => ({
      openCreateLesson,
      openUpdateLesson,
    }),
    [openCreateLesson, openUpdateLesson],
  );

  return (
    <LessonDialogContext.Provider value={contextValue}>
      {children}

      <CreateLessonDialog
        open={createOpen}
        onOpenChange={handleCreateOpenChange}
        sectionId={activeSectionId}
      />

        {activeLessonId && (
        <UpdateLessonDialog
          open={updateOpen}
          onOpenChange={handleUpdateOpenChange}
          lessonId={activeLessonId}
        />
      )}
    </LessonDialogContext.Provider>
  );
}
