export const certificateQueryKeys = {
  all: ["certificates"] as const,

  mine: () => [...certificateQueryKeys.all, "mine"] as const,

  course: (courseId: string) =>
    [...certificateQueryKeys.all, "course", courseId] as const,

  user: (userId: string) =>
    [...certificateQueryKeys.all, "user", userId] as const,

  student: (courseId: string, studentId: string) =>
    [...certificateQueryKeys.all, "student", courseId, studentId] as const,

  detail: (courseId: string, certificateId: string) =>
    [...certificateQueryKeys.all, "detail", courseId, certificateId] as const,

  byNumber: (courseId: string, certificateNumber: string) =>
    [
      ...certificateQueryKeys.all,
      "by-number",
      courseId,
      certificateNumber,
    ] as const,
};
