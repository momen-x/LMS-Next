import UsersDetails from "@/app/_modules/user/views/users-details";

const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <UsersDetails userId={id} />
    </div>
  );
};

export default UserDetailsPage;
