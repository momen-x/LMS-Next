import { CreateCategoryData } from "../dto/create-category";
import { UpdateCategoryData } from "../dto/update-category";
import { Category } from "../entity/category";
import { ICategoryAPI } from "./category";
import { api } from "@/utils/axiosInstance";

const BASE_URL = "/api/categories";

export const resCategory: ICategoryAPI = {
  create: async function (data: CreateCategoryData): Promise<Category> {
    const res = await api.post<Category>(BASE_URL, data);
    return res.data;
  },
  update: async function (
    id: string,
    data: UpdateCategoryData,
  ): Promise<Category> {
    const res = await api.patch<Category>(`${BASE_URL}/${id}`, data);
    return res.data;
  },
  getAll: async function (): Promise<Category[]> {
    const res = await api.get<Category[]>(BASE_URL);
    return res.data;
  },
  getOne: async function (id: string): Promise<Category> {
    const res = await api.get<Category>(`${BASE_URL}/${id}`);
    return res.data;
  },
  delete: async function (id: string): Promise<Category> {
    const res = await api.delete<Category>(`${BASE_URL}/${id}`);
    return res.data;
  },
};
