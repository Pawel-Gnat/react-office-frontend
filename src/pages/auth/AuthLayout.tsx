import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

const AuthLayout = () => {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <main className="flex min-h-screen w-full justify-center items-center p-4">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
