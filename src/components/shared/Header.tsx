import axios from "axios";

import { useAuthContext } from "@/context/AuthContext";

import { DB_URL } from "@/utils/database";

import Navbar from "./Navbar";

import Button from "@mui/joy/Button";

const Header = () => {
  const { setToken } = useAuthContext();

  const logOut = async () => {
    setToken(null);
    localStorage.removeItem("token");

    try {
      axios.get(`${DB_URL}/auth/logout`, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 gap-4">
      <Navbar />
      <Button
        color="primary"
        loading={false}
        onClick={logOut}
        size="md"
        variant="solid">
        Logout
      </Button>
    </header>
  );
};

export default Header;
