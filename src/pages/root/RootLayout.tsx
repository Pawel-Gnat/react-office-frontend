import { Navigate, Outlet } from "react-router-dom";

import { ModalProvider } from "@/context/ModalContext";
import { useAuthContext } from "@/context/AuthContext";
import { ClientsProvider } from "@/context/ClientsContext";
import { UsersProvider } from "@/context/UsersContext";

import Header from "@/components/shared/Header";
import Modal from "@/components/shared/Modal";

const RootLayout = () => {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <UsersProvider>
      <ClientsProvider>
        <ModalProvider>
          <Header />
          <main className="flex flex-1 h-full p-4">
            <Outlet />
          </main>
          <Modal />
        </ModalProvider>
      </ClientsProvider>
    </UsersProvider>
  );
};

export default RootLayout;
