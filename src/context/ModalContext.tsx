import {
  createContext,
  ReactNode,
  useContext,
  Dispatch,
  useReducer,
} from "react";

import { modalReducer } from "../reducers/modalReducer";

import { ModalState, ModalStateAction } from "../types";

interface ModalContextProps extends ModalState {
  dispatch: Dispatch<ModalStateAction>;
}

const INITIAL_STATE: ModalState = {
  isOpen: false,
  isLoading: false,
  modalContent: null,
  clientId: "",
  userId: "",
};

const ModalContext = createContext<ModalContextProps>({
  ...INITIAL_STATE,
  dispatch: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE);

  return (
    <ModalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
