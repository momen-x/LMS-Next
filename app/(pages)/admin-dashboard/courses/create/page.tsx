import { Metadata } from "next";

import CourseForm from "@/app/_modules/course/views/create-update-course";

export const metadata: Metadata = {
  title: "Create new Course",
};
const CreateCoursePage = () => {
  return (
    <>
      <CourseForm onCancel="/admin-dashboard/courses" />
    </>
  );
};

export default CreateCoursePage;
