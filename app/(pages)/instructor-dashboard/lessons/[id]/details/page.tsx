import { Metadata } from "next";

import { LessonDialogProvider } from "@/app/_modules/lesson/context/lesson-dialog-context";
import { MediaDialogProvider } from "@/app/_modules/media/context/media-dialog-context";
import LessonDetails from "@/app/_modules/lesson/views/lesson-details";


export const metadata: Metadata = {
  title: "Lesson details page",
  description: "This is the lesson details page",
};

const LessonDetailsPage = () => {
  return (
    <LessonDialogProvider>
      <MediaDialogProvider>
        <LessonDetails />
      </MediaDialogProvider>
    </LessonDialogProvider>
  );
};
export default LessonDetailsPage;
