import { Metadata } from "next";
import AuthGuard from "@/components/guards/AuthGuard";
import StudentDashboard from "@/app/_modules/student-dashboard/views/student-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Student Dashboard",
};

const StudentDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthGuard>
      <StudentDashboard>
        <>{children}</>
      </StudentDashboard>
    </AuthGuard>
  );
};

export default StudentDashboardLayout;
