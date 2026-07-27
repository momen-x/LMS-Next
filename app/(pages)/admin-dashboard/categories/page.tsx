import { Metadata } from "next";

import CategoryTable from "@/app/_modules/category/views/category-table";

export const metaData: Metadata = {
  title: "Categories table",
  description: "Admin dashboard for categories",
};
const CategoriesPage = () => {
  return (
    <>
      <CategoryTable />
    </>
  );
};

export default CategoriesPage;
