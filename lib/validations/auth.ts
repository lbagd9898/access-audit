import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
