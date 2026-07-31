import { Metadata } from "next";
import RoleGuard from "@/components/guards/RoleGuard";
import InstructorDashboard from "@/app/_modules/instructor-dashboard/views/instructor-dashboard";

export const metadata: Metadata = {
  title: "Instructor Dashboard",
  description: "Instructor Dashboard",
};

const InstructorDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <InstructorDashboard>
      <RoleGuard allowedRoles={["instructor"]}>
        <>{children}</>
      </RoleGuard>
    </InstructorDashboard>
  );
};

export default InstructorDashboardLayout;
