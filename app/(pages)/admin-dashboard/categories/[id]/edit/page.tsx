import EditCategory from "@/app/_modules/category/views/update-category";
import { TParams } from "@/types/params";
import React from "react";

const EditCategoryPage = async ({ params }: TParams) => {
  const { id } = await params;
  console.log(params);
  return (
    <div>
      <EditCategory categoryId={id} />
    </div>
  );
};

export default EditCategoryPage;
