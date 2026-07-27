import DeleteUserByAdmin from "@/app/_modules/user/views/delete-user-by-admin";

const DeleteUserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
      <DeleteUserByAdmin userId={id} />
    </div>
  );
};

export default DeleteUserPage;
