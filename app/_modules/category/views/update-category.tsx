"use client";
import CategoryForm from "@/app/_modules/category/views/create-update-category-form";
import QueryErrorState from "@/components/sharing/query-error-state";
import { CardSkeleton } from "@/components/skeletons/card-skeleton";

import { useGetCategory } from "../hooks/useGetCategory";
import NoData from "@/components/sharing/no-data";

const EditCategory = ({ categoryId }: { categoryId: string }) => {
  const {
    data: category,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetCategory(categoryId);
  if (isLoading)
    return (
      <div>
        <CardSkeleton />
      </div>
    );
  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load Category"
        description="We couldn’t load the category."
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }
  if (!category) {
    return <NoData />;
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
