import { ModalState, ModalStateAction } from "../types";

export const modalReducer = (
  state: ModalState,
  action: ModalStateAction
): ModalState => {
  switch (action.type) {
    case "ADD_CLIENT":
      return {
        ...state,
        isOpen: true,
        modalContent: "add-client",
      };

    case "EDIT_CLIENT":
      return {
        ...state,
        isOpen: true,
        modalContent: "edit-client",
        clientId: action.payload.clientId,
      };

    case "DELETE_CLIENT":
      return {
        ...state,
        isOpen: true,
        modalContent: "delete-client",
        clientId: action.payload.clientId,
      };

    case "ADD_USER":
      return {
        ...state,
        isOpen: true,
        modalContent: "add-user",
      };

    case "EDIT_USER":
      return {
        ...state,
        isOpen: true,
        modalContent: "edit-user",
        userId: action.payload.userId,
      };

    case "DELETE_USER":
      return {
        ...state,
        isOpen: true,
        modalContent: "delete-user",
        userId: action.payload.userId,
      };

    case "HIDE":
      return {
        ...state,
        isOpen: false,
        modalContent: null,
        clientId: "",
        userId: "",
      };

    case "LOADING":
      return {
        ...state,
        isOpen: action.payload.isLoading,
      };
  }
};
