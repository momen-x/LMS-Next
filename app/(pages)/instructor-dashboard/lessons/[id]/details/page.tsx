import LessonDetails from "@/app/_modules/lesson/views/lesson-details";
import { MediaDialogProvider } from "@/app/_modules/media/context/media-dialog-context";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lesson details page",
  description: "This is the lesson details page",
};

const LessonDetailsPage = () => {
  return (
    <MediaDialogProvider>
      <LessonDetails />
    </MediaDialogProvider>
  );
};
export default LessonDetailsPage;
