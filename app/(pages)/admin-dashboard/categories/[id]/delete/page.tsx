import DeleteCategory from "@/app/_modules/category/views/delete-category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update category",
  description: "Update category by admin",
};
const DeleteCategoryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <DeleteCategory categoryId={id} />
    </div>
  );
};

export default DeleteCategoryPage;
