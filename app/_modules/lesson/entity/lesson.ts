export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  description: string | null;
  duration: number; // in seconds
  order: number;
  isPreview: boolean;
  createdAt: string;
  updatedAt: string;
}
