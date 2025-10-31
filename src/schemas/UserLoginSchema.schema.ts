import z from "zod";

const UserLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
});

export default UserLoginSchema;
