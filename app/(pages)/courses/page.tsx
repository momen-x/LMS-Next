import { Metadata } from "next";

import CoursePageView from "@/app/_modules/course/views/course-page-view";

export const metadata: Metadata = {
  title: "Explore Courses",
  description: "Instructor Dashboard",
};

const CoursePage = () => {
  return (
    <>
      <CoursePageView>
        <></>
      </CoursePageView>
    </>
  );
};

export default CoursePage;
