import { CreateSectionData } from "../dto/create-section";
import { UpdateSectionData } from "../dto/update-section";
import { Section } from "../entity/section";

export interface ISectionAPI {
  getCourseSections: (courseId: string) => Promise<Section[]>;
  getSection: (id: string) => Promise<Section>;
  create: (courseId: string, data: CreateSectionData) => Promise<Section>;
  update: (id: string, data: UpdateSectionData) => Promise<Section>;
  delete: (id: string) => Promise<Section>;
}
