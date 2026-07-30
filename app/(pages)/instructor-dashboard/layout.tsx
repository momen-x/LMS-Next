import { Metadata } from "next";
import InstructorDashboard from "../../_modules/instructor/views/instructor-dashboard";
import RoleGuard from "@/components/guards/RoleGuard";

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
