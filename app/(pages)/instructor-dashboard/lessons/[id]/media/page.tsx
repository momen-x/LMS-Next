import LessonMedia from "@/app/_modules/media/views/lesson-media";
import { MediaDialogProvider } from "@/app/_modules/media/context/media-dialog-context";
import { Metadata } from "next";
import { TParams } from "@/types/params";

export const metadata: Metadata = {
  title: "Lesson details page",
  description: "This is the lesson details page",
};

const ManageMediaPage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <MediaDialogProvider>
      <div>
        <LessonMedia lessonId={id} />
      </div>
    </MediaDialogProvider>
  );
};

export default ManageMediaPage;
