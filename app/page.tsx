import CategoriesTable from "./_modules/category/views/category-table";
import CategoryForm from "./_modules/category/views/create-update-category-form";
import EmptyCourses from "./_modules/course/views/empty-courses";

export default function Home() {
  return (
    <div>
      <CategoriesTable />
      <CategoryForm />
      <EmptyCourses />
    </div>
  );
}
