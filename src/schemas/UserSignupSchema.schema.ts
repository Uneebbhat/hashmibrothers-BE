import z from "zod";

import { Role } from "../interface";

const UserSignupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
  role: z.enum([Role.user, Role.admin]).default(Role.user),
});

export default UserSignupSchema;
