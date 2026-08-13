import type { CourseLearning } from "../../entities/course-learning";

export type SelectedLearningItem =
  | { type: "lesson"; id: string }
  | { type: "quiz"; id: string }
  | { type: "reviews" };

export function getInitialLearningItem(
  course: CourseLearning,
): SelectedLearningItem | null {
  const lessons = course.sections.flatMap((section) => section.lessons);
  const completedLessonIds = new Set(
    course.enrollment?.lessonProgress
      .filter((progress) => progress.completed)
      .map((progress) => progress.lessonId) ?? [],
  );

  const activeQuiz = course.quizzes.find((quiz) =>
    quiz.attempts.some((attempt) => attempt.status === "in_progress"),
  );
  if (activeQuiz) return { type: "quiz", id: activeQuiz.id };

  const savedType = course.enrollment?.lastLearningType;
  const savedId = course.enrollment?.lastLearningItemId;
  if (
    savedType === "lesson" &&
    savedId &&
    lessons.some((lesson) => lesson.id === savedId)
  ) {
    return { type: "lesson", id: savedId };
  }
  if (
    savedType === "quiz" &&
    savedId &&
    course.quizzes.some((quiz) => quiz.id === savedId)
  ) {
    return { type: "quiz", id: savedId };
  }

  const firstIncompleteLesson = lessons.find(
    (lesson) => !completedLessonIds.has(lesson.id),
  );
  if (firstIncompleteLesson) {
    return { type: "lesson", id: firstIncompleteLesson.id };
  }

  const firstUnfinishedQuiz = course.quizzes.find(
    (quiz) =>
      !quiz.attempts.some(
        (attempt) =>
          attempt.status === "submitted" &&
          attempt.score !== null &&
          attempt.score >= quiz.passingScore,
      ),
  );
  if (firstUnfinishedQuiz) {
    return { type: "quiz", id: firstUnfinishedQuiz.id };
  }

  if (lessons[0]) return { type: "lesson", id: lessons[0].id };
  if (course.quizzes[0]) return { type: "quiz", id: course.quizzes[0].id };
  return null;
}
