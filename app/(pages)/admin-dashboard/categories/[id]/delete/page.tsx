import DeleteCategory from "@/app/_modules/category/views/delete-category";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update category",
  description: "Update category by admin",
};
const DeleteCategoryPage = async ({ params }: TParams) => {
  const { id } = await params;
  return (
    <div>
      <DeleteCategory categoryId={id} />
    </div>
  );
};

export default DeleteCategoryPage;
