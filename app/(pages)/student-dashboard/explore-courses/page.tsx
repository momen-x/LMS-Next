import { Metadata } from "next";

import ExploreCourses from "@/app/_modules/course/views/auth-user-explorer-courses";
export const metadata: Metadata = {
  title: "Explore Courses",
  description: "Student Dashboard",
};

const page = () => {
  return (
    <>
      <ExploreCourses />
    </>
  );
};

export default page;
