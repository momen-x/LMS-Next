import CourseLearning from "@/app/_modules/course/views/learning-view-page/course-learning";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Page",
  description: "This is the learning page for the course",
};
const LearningPage = async ({ params }: TParams) => {
  const { id } = await params;
  return <CourseLearning courseId={id} />;
};

export default LearningPage;
