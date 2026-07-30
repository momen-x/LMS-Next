import UsersDetails from "@/app/_modules/user/views/users-details";
import { TParams } from "@/types/params";

const UserDetailsPage = async ({ params }: TParams) => {
  const { id } = await params;
  return (
    <div>
      <UsersDetails userId={id} />
    </div>
  );
};

export default UserDetailsPage;
