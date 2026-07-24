import { useQuery } from "@tanstack/react-query";
import { resSection } from "../repo/resSection";
import { SECTION_KEYS } from "./useGetCourseSections";

export const useGetSection = (id: string) => {
  return useQuery({
    queryKey: SECTION_KEYS.detail(id),
    queryFn: () => resSection.getSection(id),
    enabled: !!id,
  });
};
