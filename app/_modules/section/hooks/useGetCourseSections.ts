import { useQuery } from "@tanstack/react-query";
import { resSection } from "../repo/resSection";

export const SECTION_KEYS = {
  all: ["sections"] as const,

  courseList: (courseId: string) =>
    [...SECTION_KEYS.all, "course", courseId] as const,

  detail: (sectionId: string) =>
    [...SECTION_KEYS.all, "detail", sectionId] as const,
};
export const useGetCourseSections = (courseId: string) => {
  return useQuery({
    queryKey: SECTION_KEYS.courseList(courseId),
    queryFn: () => resSection.getCourseSections(courseId),
    enabled: !!courseId,
  });
};
