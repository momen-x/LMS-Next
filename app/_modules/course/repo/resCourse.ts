import { CreateCourseData } from "../dto/create-course";
import { TSearchCoursesParams } from "../dto/search-course";
import { UpdateCourseData } from "../dto/update-course";
import { Course } from "../entity/course";
import { InstructorEnrollmentStats } from "../entity/instructour-users-enrollments";
import { SearchCoursesResponse } from "../entity/search-response-type";
import { ICourseAPI } from "./course";
import { api } from "@/utils/axiosInstance";

const BASE_URL = "/api/courses";

function buildCourseFormData(
  data: CreateCourseData | UpdateCourseData,
): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, value instanceof File ? value : String(value));
  });

  return formData;
}

export const resCourse: ICourseAPI = {
  getAll: async function (
    page: number = 1,
    limit: number = 10,
  ): Promise<Course[]> {
    const res = await api.get<Course[]>(
      `${BASE_URL}?page=${page}&limit=${limit}`,
    );
    return res.data;
  },
  search: async (
    params: TSearchCoursesParams = {},
  ): Promise<SearchCoursesResponse> => {
    const { page = 1, limit = 10, category, price, level, language } = params;

    const searchParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (category) searchParams.set("category", category);
    if (price !== undefined) searchParams.set("price", String(price));
    if (level) searchParams.set("level", level);
    if (language) searchParams.set("language", language);

    const res = await api.get<SearchCoursesResponse>(
      `${BASE_URL}/search?${searchParams.toString()}`,
    );

    return res.data;
  },
  getOne: async function (id: string): Promise<Course> {
    const res = await api.get<Course>(`${BASE_URL}/${id}`);
    return res.data;
  },
  delete: async function (id: string): Promise<Course> {
    const res = await api.delete<Course>(`${BASE_URL}/${id}`);
    return res.data;
  },
  create: async (data) => {
    const formData = buildCourseFormData(data);

    const res = await api.post<Course>(BASE_URL, formData);

    return res.data;
  },
  update: async function (id: string, data: UpdateCourseData): Promise<Course> {
    const formData = buildCourseFormData(data);

    const res = await api.patch<Course>(`${BASE_URL}/${id}`, formData);
    return res.data;
  },
  getInstructorCourses: async function (): Promise<Course[]> {
    const res = await api.get<Course[]>(`${BASE_URL}/instructor/my-courses`);
    return res.data;
  },
  getInstructorCoursesByAdmin: async function (
    instructorId: string,
  ): Promise<Course[]> {
    const res = await api.get<Course[]>(`${BASE_URL}/${instructorId}/courses`);
    return res.data;
  },
  findCourseUserEnrollment:
    async function (): Promise<InstructorEnrollmentStats> {
      const res = await api.get("/api/courses/instructor/enrollment-stats");
      return res.data;
    },
};
