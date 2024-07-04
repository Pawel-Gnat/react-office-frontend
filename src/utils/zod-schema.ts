import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});

export const clientSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  address: z.string().min(3, "Address must be at least 3 characters long"),
  userId: z.string(),
});

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  surname: z.string().min(3, "Surname must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(3, "Password must be at least 3 characters long"),
});
