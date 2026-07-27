import { Metadata } from "next";
import AdminDashboard from "../../_modules/admin-dashboard/views/admin-dashboard";
import RoleGuard from "@/components/guards/RoleGuard";
import { childrenPropsType } from "@/types/children-type";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const AdminDashboardLayout = ({ children }: childrenPropsType) => {
  return (
    <>
      <RoleGuard allowedRoles={["admin"]}>
        <AdminDashboard>{children}</AdminDashboard>
      </RoleGuard>
    </>
  );
};

export default AdminDashboardLayout;
