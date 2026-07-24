import { CreateCategoryData } from "../dto/create-category";
import { UpdateCategoryData } from "../dto/update-category";
import { Category } from "../entity/category";
export interface ICategoryAPI {
  create: (data: CreateCategoryData) => Promise<Category>;
  update: (id: string, data: UpdateCategoryData) => Promise<Category>;
  getAll: () => Promise<Category[]>;
  getOne: (id: string) => Promise<Category>;
  delete: (id: string) => Promise<Category>;
}
