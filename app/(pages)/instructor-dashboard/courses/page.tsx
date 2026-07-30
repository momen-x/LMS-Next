import { Metadata } from "next";

import CoursesTable from "@/app/_modules/course/views/instructor-courses-table";

export const metadata: Metadata = {
  title: "Courses table",
  description: "Instructor dashboard, courses table",
};
const CoursesPage = () => {
  return (
    <>
      <CoursesTable />
    </>
  );
};

export default CoursesPage;
