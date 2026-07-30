import CourseSections from "@/app/_modules/section/views/course-sections";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Sections Page",
};
const CorseSectionsPage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <div>
      <CourseSections courseId={id} />
    </div>
  );
};

export default CorseSectionsPage;
