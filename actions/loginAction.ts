"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { loginSchema } from "@/lib/shcema/zodSchema";
import { createToken } from "@/lib/session";
import bcrypt from "bcryptjs";
import z from "zod";

export async function loginAction(initialState, formData) {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);
  console.log("Parsed Login Data:", parsed);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = z.flattenError(parsed.error);
    return {
      success: false,
      errors: {
        ...fieldErrors,
        general: formErrors || [],
      },
      data: {
        email: raw.email,
        password: raw.password,
      },
    };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("b2b-agency");
    const users = db.collection("users");

    const user = await users.findOne({ email: parsed.data.email });
    if (!user) {
      return {
        success: false,
        errors: {
          email: ["Email not registered"],
        },
        data: {
          email: parsed.data.email,
          password: parsed.data.password,
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(
      parsed.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        errors: {
          password: ["Password is incorrect"],
        },
        data: {
          email: parsed.data.email,
          password: parsed.data.password,
        },
      };
    }
    console.log("Login User Data:", user);

    await createToken({ userId: user.userId, roles: user.roles });

    return {
      success: true,
      data: {
        general: ["Login successful"],
        redirectTo: "/dashboard",
      },
    };
  } catch (error) {
    console.log("Database error:", error);
    return {
      success: false,
      errors: {
        general: ["Database error occurred"],
      },
    };
  }
}
