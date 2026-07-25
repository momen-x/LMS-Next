export interface LessonResource {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  description: string | null;
  duration: number; // in seconds
  order: number;
  isPreview: boolean;
  resources: LessonResource[] | null;
  createdAt: string;
  updatedAt: string;
}
