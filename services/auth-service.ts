import { connectToDatabase } from "@/lib/mongodb";
import { AppError } from "@/types/errors";
import { User } from "@/types/user";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export const createUser = async ({
  first_name,
  last_name,
  email,
  password,
}: UserData): Promise<User> => {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const users = db.collection<User>("users");

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    throw new AppError("EMAIL_EXISTS", "Email already exists.", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserId = uuidv4();

  const result = await users.insertOne({
    userId: newUserId,
    first_name,
    last_name,
    email,
    password: hashedPassword,
    role: "user",
    created_at: new Date(),
    updated_at: new Date(),
  });

  console.log("Create user result:", result);

  if (!result.acknowledged) {
    throw new AppError("REGISTRATION_FAILED", "Registration failed", 500);
  }

  const insertedUser: User | null = await users.findOne({ userId: newUserId });

  if (!insertedUser) {
    throw new AppError(
      "USER_NOT_FOUND",
      "Could not retrieve inserted user",
      500
    );
  }

  return insertedUser;
};
