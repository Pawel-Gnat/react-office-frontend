import axios from "axios";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { socket } from "../socket";

import { DB_URL } from "../utils/database";

import { User } from "../types";

const INITIAL_STATE = {
  users: [],
  setUsers: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

interface UsersContextProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const UsersContext = createContext<UsersContextProps>(INITIAL_STATE);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${DB_URL}/users`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("users");
    };
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers, isLoading, setIsLoading }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
