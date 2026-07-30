import AdminCourseDetails from "@/app/_modules/course/views/admin-course-details";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Details",
  description: "Course Details",
};

const CourseDetailsPage = async ({ params }: TParams) => {
  const { id } = await params;
  return (
    <>
      <AdminCourseDetails
        courseId={id}
        onEdit={`/admin-dashboard/courses/${id}/update`}
        onDelete={`/admin-dashboard/courses/${id}/delete`}
        viewStudents={`/admin-dashboard/courses/${id}/students`}
      />
    </>
  );
};

export default CourseDetailsPage;
