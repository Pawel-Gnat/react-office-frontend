import axios from "axios";
import { socket } from "../../socket";

import { useModalContext } from "../../context/ModalContext";

import { DB_URL } from "../../utils/database";

import { Button, Stack } from "@mui/joy";

const DeleteClient = () => {
  const { isLoading, clientId, dispatch } = useModalContext();

  const onDelete = async (clientId: string) => {
    if (isLoading) {
      return;
    }
    dispatch({ type: "LOADING", payload: { isLoading: true } });

    try {
      const response = await axios.delete(`${DB_URL}/clients/${clientId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        socket.emit("sendClients");
        dispatch({ type: "HIDE" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "LOADING", payload: { isLoading: false } });
    }
  };

  return (
    <Stack spacing={1}>
      <p>
        Are you sure you want to delete this client? This process is
        irreversible, and once deleted, all data associated with this client
        will be permanently removed.
      </p>
      <div className="flex gap-2 justify-end">
        <Button
          onClick={() => dispatch({ type: "HIDE" })}
          loading={isLoading}
          size="md"
          variant="solid">
          Cancel
        </Button>
        <Button
          onClick={() => onDelete(clientId)}
          loading={isLoading}
          size="md"
          color="danger"
          variant="solid">
          Delete
        </Button>
      </div>
    </Stack>
  );
};

export default DeleteClient;
