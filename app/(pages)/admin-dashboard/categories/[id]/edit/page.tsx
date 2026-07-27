import EditCategory from "@/app/_modules/category/views/update-category";
import React from "react";

const EditCategoryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log(params);
  return (
    <div>
      <EditCategory categoryId={id} />
    </div>
  );
};

export default EditCategoryPage;
