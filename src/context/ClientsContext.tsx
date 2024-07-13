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
// import { socket } from "../socket";

import { DB_URL } from "../utils/database";

import { Client } from "../types";

const INITIAL_STATE = {
  clients: [],
  setClients: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

interface ClientsContextProps {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const ClientsContext = createContext<ClientsContextProps>(INITIAL_STATE);

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getClients = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${DB_URL}/clients`);

      if (response.status === 200) {
        setClients(response.data);
      }
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  // useEffect(() => {
  //   socket.on("clients", (data) => {
  //     setClients(data);
  //   });

  //   return () => {
  //     socket.off("clients");
  //   };
  // }, []);

  return (
    <ClientsContext.Provider
      value={{ clients, setClients, isLoading, setIsLoading }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClientsContext = () => useContext(ClientsContext);
