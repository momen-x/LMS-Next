import CourseInfo from "@/app/_modules/course/views/course-info";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course details page",
  description: "This is the course details page",
};
const CourseInfosPage = async ({ params }: TParams) => {
  const { id } = await params;
  return (
    <div>
      <CourseInfo id={id} /> 
    </div>
  );
};

export default CourseInfosPage;
