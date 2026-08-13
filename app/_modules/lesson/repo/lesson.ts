import { Media } from "../../media/entity/media";
import { CreateLessonData } from "../dto/create-lesson";
import { UpdateLessonData } from "../dto/update-lesson";
import { Lesson } from "../entity/lesson";

export interface PreviewLesson extends Lesson {
  media: Media[];
}

export interface LessonsResponse {
  lessons: PreviewLesson[];
  count: number;
}
export interface ILessonAPI {
  getLesson: (lessonId: string) => Promise<Lesson>;
  getSectionLessons: (sectionId: string) => Promise<Lesson[]>;
  getIsPreviewLessons: (courseId: string) => Promise<LessonsResponse>;
  create: (sectionId: string, data: CreateLessonData) => Promise<Lesson>;
  update: (lessonId: string, data: UpdateLessonData) => Promise<Lesson>;
  delete: (lessonId: string) => Promise<Lesson>;
}
