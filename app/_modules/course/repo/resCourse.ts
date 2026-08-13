import { CreateCourseData } from "../dto/create-course";
import { CreateRejectMessageData } from "../dto/create-reject-message";
import { TSearchCoursesParams } from "../dto/search-course";
import { UpdateCourseData } from "../dto/update-course";
import { Course } from "../entities/course";
import { CourseLearning } from "../entities/course-learning";
import { InstructorEnrollmentStats } from "../entities/instructor-users-enrollments";
import { CourseWithInstructor } from "../entities/pending-course";
import { SearchCoursesResponse } from "../entities/search-response-type";
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
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      level,
      language,
    } = params;

    const searchParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (category) searchParams.set("category", category);
    if (minPrice !== undefined) searchParams.set("price", String(minPrice));
    if (maxPrice !== undefined) searchParams.set("price", String(maxPrice));
    if (level) searchParams.set("level", level);
    if (language) searchParams.set("language", language);

    const res = await api.get<SearchCoursesResponse>(
      `${BASE_URL}/search?${searchParams.toString()}`,
    );

    return res.data;
  },
  getPendingCourses: async function (): Promise<CourseWithInstructor[]> {
    const res = await api.get<CourseWithInstructor[]>(`${BASE_URL}/pending`);
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
  submitForReview: async function (courseId: string): Promise<Course> {
    const res = await api.patch<Course>(
      `${BASE_URL}/${courseId}/submit-for-review`,
    );
    return res.data;
  },
  approveCourse: async function (courseId: string): Promise<Course> {
    const res = await api.patch<Course>(`${BASE_URL}/${courseId}/approve`);
    return res.data;
  },
  rejectCourse: async function (
    courseId: string,
    data: CreateRejectMessageData,
  ): Promise<Course> {
    const res = await api.patch<Course>(`${BASE_URL}/${courseId}/reject`, data);
    return res.data;
  },
  getCourseLearning: async function (id: string): Promise<CourseLearning> {
    const res = await api.get<CourseLearning>(`${BASE_URL}/${id}/learning`);
    return res.data;
  },
  getHighRatingCourses(count?: number): Promise<Course[]> {
    return api.get<Course[]>(`/api/courses/high-rating?count=${count ?? 1}`).then((res) => res.data);
},
}