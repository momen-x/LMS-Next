import { Metadata } from "next";

import { MediaDialogProvider } from "@/app/_modules/media/context/media-dialog-context";
import LessonMedia from "@/app/_modules/media/views/lesson-media";
export const metadata: Metadata = {
  title: "Create Media Page",
};

const CreateMediaPage = async ({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) => {
  const { lessonId } = await params;

  return (
    <MediaDialogProvider>
      <LessonMedia lessonId={lessonId} />
    </MediaDialogProvider>
  );
};

export default CreateMediaPage;
