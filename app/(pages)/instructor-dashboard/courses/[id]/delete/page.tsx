import DeleteCourse from "@/app/_modules/course/views/delete-course";
import { TParams } from "@/types/params";

const DeleteCoursePage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <div>
      <DeleteCourse courseId={id} />
    </div>
  );
};

export default DeleteCoursePage;
