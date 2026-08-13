import CourseLearning from "@/app/_modules/course/views/learning-view-page/course-learning";
import AuthGuard from "@/components/guards/AuthGuard";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Page",
  description: "This is the learning page for the course",
};
const LearningPage = async ({ params }: TParams) => {
  const { id } = await params;
  return (
    <AuthGuard>
      <CourseLearning courseId={id} />
    </AuthGuard>
  );
};

export default LearningPage;
