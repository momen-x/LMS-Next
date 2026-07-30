"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import CreateMedia from "../views/create-media";
import UpdateMedia from "../views/update-media";

type MediaDialogContextValue = {
  openCreateMedia: (lessonId: string) => void;
  openUpdateMedia: (mediaId: string) => void;
};

const MediaDialogContext = createContext<MediaDialogContextValue | null>(null);

export function useMediaDialog() {
  const context = useContext(MediaDialogContext);

  if (!context) {
    throw new Error("useMediaDialog must be used within a MediaDialogProvider");
  }

  return context;
}

interface MediaDialogProviderProps {
  children: ReactNode;
}

export function MediaDialogProvider({ children }: MediaDialogProviderProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);

  const openCreateMedia = useCallback((lessonId: string) => {
    setActiveLessonId(lessonId);
    setCreateOpen(true);
  }, []);

  const openUpdateMedia = useCallback((mediaId: string) => {
    setActiveMediaId(mediaId);
    setUpdateOpen(true);
  }, []);

  const handleCreateOpenChange = useCallback((open: boolean) => {
    setCreateOpen(open);

    if (!open) {
      setActiveLessonId(null);
    }
  }, []);

  const handleUpdateOpenChange = useCallback((open: boolean) => {
    setUpdateOpen(open);

    if (!open) {
      setActiveMediaId(null);
    }
  }, []);

  const contextValue = useMemo<MediaDialogContextValue>(
    () => ({
      openCreateMedia,
      openUpdateMedia,
    }),
    [openCreateMedia, openUpdateMedia],
  );

  return (
    <MediaDialogContext.Provider value={contextValue}>
      {children}

      <CreateMedia
        open={createOpen}
        onOpenChange={handleCreateOpenChange}
        lessonId={activeLessonId}
      />
      {activeMediaId && (
        <UpdateMedia
          open={updateOpen}
          onOpenChange={handleUpdateOpenChange}
          mediaId={activeMediaId}
        />
      )}
    </MediaDialogContext.Provider>
  );
}
