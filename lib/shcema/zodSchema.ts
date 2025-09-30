import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[0-9]/, "At least 1 number")
  .regex(/[a-z]/, "At least 1 lowercase letter")
  .regex(/[A-Z]/, "At least 1 uppercase letter");

export const registerSchema = z.object({
  first_name: z.string().min(3, "Required min 3 characters"),
  last_name: z.string().min(3, "Required min 3 characters"),
  email: z.email("Invalid email address"),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: passwordSchema,
});

export const profileSchema = z.object({
  name: z.string().min(3, "Required min 3 chracters."),
  email: z.email("Input a valid e-mail.").optional(),
  bio: z.string().max(300, "Max character should be under 300.").optional,
});

export const preferencesSchema = z.object({
  language: z.string().optional(),
  notification: z.boolean().optional(),
});

export const userSchema = z.object({
  userId: z.uuidv4().or(z.string().min(1)), // allow uuid or non-empty string
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  role: z.enum(["admin", "user", "manager"]).default("user"),
  status: z.enum(["active", "inactive", "banned"]).default("active"),
  createdAt: z.coerce.date(), // coerce allows string/new Date
  updatedAt: z.coerce.date(),
});
