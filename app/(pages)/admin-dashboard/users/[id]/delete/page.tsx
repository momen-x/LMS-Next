import DeleteUserByAdmin from "@/app/_modules/user/views/delete-user-by-admin";
import { TParams } from "@/types/params";

const DeleteUserPage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <div>
      <DeleteUserByAdmin userId={id} />
    </div>
  );
};

export default DeleteUserPage;
