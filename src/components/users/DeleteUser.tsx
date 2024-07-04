import axios from "axios";
import { socket } from "../../socket";

import { useModalContext } from "../../context/ModalContext";

import { DB_URL } from "../../utils/database";

import { Button, Stack } from "@mui/joy";

const DeleteUser = () => {
  const { isLoading, userId, dispatch } = useModalContext();

  const onDelete = async (userId: string) => {
    if (isLoading) {
      return;
    }
    dispatch({ type: "LOADING", payload: { isLoading: true } });

    try {
      const response = await axios.delete(`${DB_URL}/users/${userId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        socket.emit("sendUsers");
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
        Are you sure you want to delete this user? This process is irreversible,
        and once deleted, all data associated with this user will be permanently
        removed.
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
          onClick={() => onDelete(userId)}
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

export default DeleteUser;
