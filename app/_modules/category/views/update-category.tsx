"use client";
import CategoryForm from "@/app/_modules/category/views/create-update-category-form";

import { useGetCategory } from "../hooks/useGetCategory";
const EditCategory = ({ categoryId }: { categoryId: string }) => {
  const { data: category, isLoading, isError } = useGetCategory(categoryId);
  if (isLoading)
    //todo
    return <div>Loading...</div>;
  if (isError) {
    //todo
    return <div>Error</div>;
  }
  if (!category) {
    //todo
    return <div>Category not found</div>;
  }

  return (
    <div>
      <CategoryForm
        id={categoryId}
        mode="edit"
        initialData={{ name: category.name, slug: category.slug }}
      />
    </div>
  );
};

export default EditCategory;
