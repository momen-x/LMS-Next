// import { CreateCategoryData } from "./_modules/category/dto/create-category";
import CategoriesTable from "./_modules/category/views/category-table";
import CategoryForm from "./_modules/category/views/create-update-category-form";
// import { CreateCourseData } from "./_modules/course/dto/create-course";
import CoursesTable from "./_modules/course/views/course-table";
import EmptyCourses from "./_modules/course/views/empty-courses";
// import CourseForm from "./_modules/course/views/create-update-course";

export default function Home() {
  return (
    <div>
      <CategoriesTable />
      <CategoryForm />
      <CoursesTable />
      <EmptyCourses/>
    </div>
  );
}
