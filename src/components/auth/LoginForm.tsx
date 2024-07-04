import Cookies from "js-cookie";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

import { loginSchema } from "../../utils/zod-schema";
import { DB_URL } from "../../utils/database";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Typography,
  Button,
  Input,
} from "@mui/joy";

const LoginForm = () => {
  const { setToken, isLoading, setIsLoading } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(`${DB_URL}/auth/login`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        Cookies.set("api_auth_token", response.data.token, {
          expires: 7,
          secure: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Typography color="primary" level="h1" variant="plain">
        Login Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <FormControl error={!!errors.email}>
            <FormLabel>Your e-mail address</FormLabel>
            <Input
              type="email"
              color="primary"
              placeholder="E-mail"
              variant="outlined"
              {...register("email", { required: true })}
            />
            <FormHelperText>
              {errors.email ? errors.email.message : ""}
            </FormHelperText>
          </FormControl>

          <FormControl error={!!errors.password}>
            <FormLabel>Your password</FormLabel>
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
            Login
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;
