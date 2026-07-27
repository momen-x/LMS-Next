import { Metadata } from "next";
import CreateCategory from "@/app/_modules/category/views/create-update-category-form";
export const metadata: Metadata = {
  title: "Create Category Page",
  description: "Create Category Page",
};
const CreateCategoryPage = () => {
  return (
    <>
      <CreateCategory />
    </>
  );
};

export default CreateCategoryPage;
