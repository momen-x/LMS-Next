import GuestGuard from "@/components/guards/GuestGuard";
import { childrenPropsType } from "@/types/children-type";

const AuthLayout = ({ children }: childrenPropsType) => {
  return (
    <>
      <GuestGuard redirectTo="/">{children}</GuestGuard>
    </>
  );
};

export default AuthLayout;
