import Cookies from "js-cookie";

import { useAuthContext } from "../../context/AuthContext";

import Navbar from "./Navbar";

import Button from "@mui/joy/Button";

const Header = () => {
  const { setToken } = useAuthContext();

  const logOut = async () => {
    setToken(null);
    localStorage.removeItem("token");
    Cookies.remove("api_auth_token");
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
