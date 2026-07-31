import StudentDashboardView from "@/app/_modules/student-dashboard/views/student-dashboard-views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Student Dashboard",
};

const StudentDashboardLayout = () => {
  return (
    <>
      <StudentDashboardView />
    </>
  );
};

export default StudentDashboardLayout;
