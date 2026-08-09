import LessonDetails from "@/app/_modules/lesson/views/lesson-details";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lesson details page",
  description: "This is the lesson details page",
};

const LessonDetailsPage = async ({ params }: TParams) => {
  const { id } = await params;
  return (
    <div>
      <LessonDetails
        manageMedia={`/instructor-dashboard/lessons/${id}/media`}
      />
    </div>
  );
};
export default LessonDetailsPage;
