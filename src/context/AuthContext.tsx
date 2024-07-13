import axios from "axios";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import { DB_URL } from "../utils/database";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  setToken: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(false);

  const verifyToken = async () => {
    if (token) {
      try {
        await axios.post(
          `${DB_URL}/auth/verify`,
          { token },
          { withCredentials: true }
        );
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
