import type { GetMyEnrollmentsParams } from "../types/get-my-enrollments";

export const enrollmentQueryKeys = {
  all: ["enrollments"] as const,

  mine: (params?: GetMyEnrollmentsParams) =>
    [...enrollmentQueryKeys.all, "mine", params ?? {}] as const,

  userStats: () => [...enrollmentQueryKeys.all, "user-stats"] as const,

  course: (courseId: string) =>
    [...enrollmentQueryKeys.all, "course", courseId] as const,

  isUserEnrolled: (courseId: string) =>
    [...enrollmentQueryKeys.all, "me", "enrolled", courseId] as const,

  detail: (enrollmentId: string) =>
    [...enrollmentQueryKeys.all, "detail", enrollmentId] as const,
};
