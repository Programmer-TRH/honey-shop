"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { registerSchema } from "@/lib/shcema/zodSchema";
import { createToken } from "@/lib/session";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export async function registrationAction(formData) {
  const parsed = registerSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      errors: z.treeifyError(parsed.error),
    };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("b2b-agency");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email: parsed.data.email });
    if (existingUser) {
      return {
        success: false,
        errors: { email: ["Email already exists."] },
      };
    }

    const { first_name, last_name, email, password } = parsed.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await users.insertOne({
      userId: uuidv4(),
      first_name,
      last_name,
      email,
      password: hashedPassword,
      roles: ["user"],
      created_at: new Date(),
      updated_at: new Date(),
    });
    await users.createIndex({ userId: 1 }, { unique: true });

    if (!user) {
      return { success: false, errors: { general: ["Registration failed"] } };
    }
    const insertedUser = await users.findOne({ _id: user.insertedId });

    await createToken({
      userId: insertedUser.userId,
      roles: insertedUser.roles,
    });
    return {
      success: true,
      message: "Registration successful",
      redirectTo: "/dashboard",
    };
  } catch (error) {
    return {
      success: false,
      errors: { general: ["Database error occurred"] },
    };
  }
}
