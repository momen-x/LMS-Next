import { CreateLessonData } from "../dto/create-lesson";
import { UpdateLessonData } from "../dto/update-lesson";
import { Lesson } from "../entity/lesson";

export interface ILessonAPI {
getLesson: (lessonId: string) => Promise<Lesson>;
getSectionLessons: (sectionId: string) => Promise<Lesson[]>;
create: (sectionId: string, data: CreateLessonData) => Promise<Lesson>;
update: (lessonId: string, data: UpdateLessonData) => Promise<Lesson>;
delete: (lessonId: string) => Promise<Lesson>;
}