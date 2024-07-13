export type Client = {
  _id: string;
  name: string;
  address: string;
  settled: boolean;
  userId: string;
};

export type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
};

export type ApiError = {
  response: {
    data: {
      error: string;
      status: string;
    };
  };
};

export type ModalState = {
  isOpen: boolean;
  isLoading: boolean;
  modalContent:
    | "add-client"
    | "edit-client"
    | "delete-client"
    | "add-user"
    | "edit-user"
    | "delete-user"
    | null;
  clientId: string;
  userId: string;
};

export type ModalStateAction =
  | {
      type: "ADD_CLIENT";
    }
  | {
      type: "EDIT_CLIENT";
      payload: {
        clientId: string;
      };
    }
  | {
      type: "DELETE_CLIENT";
      payload: {
        clientId: string;
      };
    }
  | {
      type: "ADD_USER";
    }
  | {
      type: "EDIT_USER";
      payload: {
        userId: string;
      };
    }
  | {
      type: "DELETE_USER";
      payload: {
        userId: string;
      };
    }
  | {
      type: "LOADING";
      payload: {
        isLoading: boolean;
      };
    }
  | {
      type: "HIDE";
    };
