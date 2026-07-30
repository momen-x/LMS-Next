
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  //in future the authenticated user can't go to these pages
  return <div>{children}</div>;
};

export default AuthLayout;
