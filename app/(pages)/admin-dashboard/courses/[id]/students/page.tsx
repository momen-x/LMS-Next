import CourseEnrollments from "@/app/_modules/enrollment/views/course-enrollments";
import { TParams } from "@/types/params";

const CourseStudentsPage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <div>
      <CourseEnrollments courseId={id} />
    </div>
  );
};

export default CourseStudentsPage;
