import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { socket } from "../../socket";

import { useUsersContext } from "../../context/UsersContext";
import { useModalContext } from "../../context/ModalContext";

import { userSchema } from "../../utils/zod-schema";
import { DB_URL } from "../../utils/database";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Button,
  Input,
} from "@mui/joy";

const UserForm = () => {
  const { isLoading, userId, dispatch } = useModalContext();
  const { users } = useUsersContext();
  const user = users.find((user) => user._id === userId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      password: "",
    },
  });

  const handleApiRoute = () => {
    if (userId) {
      return `${DB_URL}/users/${userId}`;
    }
    return `${DB_URL}/users`;
  };

  const handleApiMethod = () => {
    if (userId) {
      return "patch";
    }
    return "post";
  };

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    if (isLoading) {
      return;
    }
    dispatch({ type: "LOADING", payload: { isLoading: true } });

    try {
      const response = await axios[handleApiMethod()](handleApiRoute(), data, {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <FormControl error={!!errors.name}>
          <FormLabel>User name</FormLabel>
          <Input
            type="text"
            color="primary"
            placeholder="Name"
            variant="outlined"
            {...register("name", { required: true })}
          />
          <FormHelperText>
            {errors.name ? errors.name.message : ""}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.surname}>
          <FormLabel>User surname</FormLabel>
          <Input
            type="text"
            color="primary"
            placeholder="Surname"
            variant="outlined"
            {...register("surname", { required: true })}
          />
          <FormHelperText>
            {errors.surname ? errors.surname.message : ""}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.email}>
          <FormLabel>User email</FormLabel>
          <Input
            type="email"
            color="primary"
            placeholder="Email"
            variant="outlined"
            {...register("email", { required: true })}
          />
          <FormHelperText>
            {errors.email ? errors.email.message : ""}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.password}>
          <FormLabel>User password</FormLabel>
          <Input
            type="password"
            color="primary"
            placeholder="Password"
            variant="outlined"
            {...register("password", { required: true })}
          />
          <FormHelperText>
            {errors.password ? errors.password.message : ""}
          </FormHelperText>
        </FormControl>
        <Button type="submit" loading={isLoading} size="md" variant="solid">
          {userId ? "Edit" : "Create"}
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
