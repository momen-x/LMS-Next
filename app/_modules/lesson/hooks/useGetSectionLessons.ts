import { useQuery } from "@tanstack/react-query";
import { resLesson } from "../repo/resLesson";

export const Lesson_KEYS = {
  all: ["lessons"] as const,

  sectionList: (sectionId: string) =>
    [...Lesson_KEYS.all, "section", sectionId] as const,

  detail: (lessonId: string) =>
    [...Lesson_KEYS.all, "detail", lessonId] as const,
};

export const useGetSectionLessons = (sectionId: string) => {
  return useQuery({
    queryKey: Lesson_KEYS.sectionList(sectionId),
    queryFn: () => resLesson.getSectionLessons(sectionId),
    enabled: !!sectionId,
  });
};
