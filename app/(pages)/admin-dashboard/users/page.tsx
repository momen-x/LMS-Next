import { Metadata } from "next";

import UsersTable from "@/app/_modules/user/views/users-table";

export const metadata: Metadata = {
  title: "Users Table",
  description: "Admin Dashboard",
};
const UsersPage = () => {
  return (
    <>
      <UsersTable />
    </>
  );
};

export default UsersPage;
