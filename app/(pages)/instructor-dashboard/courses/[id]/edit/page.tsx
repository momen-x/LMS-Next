"use client";
import CourseForm from "@/app/_modules/course/views/create-update-course";
import { useGetCourse } from "@/app/_modules/course/hooks/useGetCourse";
import { useParams } from "next/navigation";

const EditCoursePage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: course, isLoading } = useGetCourse(id);

  if (isLoading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <CourseForm
      id={id}
      mode="edit"
      initialData={{
        categoryId: course.categoryId,
        title: course.title,
        description: course.description,
        price: course.price,
        language: course.language,
        level: course.level,
        thumbnail: undefined,
      }}
      onCancel="/instructor-dashboard/courses"
    />
  );
};

export default EditCoursePage;
