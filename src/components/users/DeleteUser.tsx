import axios from "axios";
// import { socket } from "../../socket";

import { useModalContext } from "@/context/ModalContext";
import { useUsersContext } from "@/context/UsersContext";
import { useSnackContext } from "@/context/SnackContext";

import { DB_URL } from "@/utils/database";

import { Button, Stack } from "@mui/joy";

const DeleteUser = () => {
  const { isLoading, userId, dispatch } = useModalContext();
  const { setUsers } = useUsersContext();
  const { setSnack } = useSnackContext();

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
        // socket.emit("sendUsers");
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        dispatch({ type: "HIDE" });
        setSnack(response.data.message, response.data.status);
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setSnack(error.response.data.error, error.response.data.status);
        }
      }
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
