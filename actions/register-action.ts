"use server";

import { registerSchema } from "@/lib/shcema/zodSchema";
import { createToken } from "@/lib/session";
import { createUser } from "@/services/auth-service";
import { ActionResponse } from "@/types/action-response";
import z from "zod";
import { AppError } from "@/types/errors";

export async function registrationAction(
  formData: FormData
): Promise<ActionResponse> {
  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    const errors = z.flattenError(parsed.error);
    console.log("Errors:", errors);
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      code: "VALIDATION_FAILED",
      data: errors,
    };
  }

  const { first_name, last_name, email, password } = parsed.data;

  try {
    const insertedUser = await createUser({
      first_name,
      last_name,
      email,
      password,
    });
    console.log("Inserted User:", insertedUser);

    const token = await createToken(insertedUser.userId, insertedUser.role);

    console.log("Token Creating:", token);

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error: any) {
    console.log("Error:", error);
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
        code: error.code,
      };
    }
    return {
      success: false,
      message:
        error.message ||
        "An unexpected error occurred. Please try again later.",
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}
