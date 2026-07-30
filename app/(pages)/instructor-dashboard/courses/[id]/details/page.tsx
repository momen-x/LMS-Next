import CourseDetails from "@/app/_modules/course/views/course-details";
import { TParams } from "@/types/params";
import React from "react";

const CourseDetailsPage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <div>
      {" "}
      <CourseDetails
        courseId={id}
        onDelete={`/instructor-dashboard/courses/${id}/delete`}
        onEdit={`/instructor-dashboard/courses/${id}/edit`}
        manageSections={`/instructor-dashboard/courses/${id}/sections`}
        viewStudents={`/instructor-dashboard/courses/${id}/students`}
      />
    </div>
  );
};

export default CourseDetailsPage;
