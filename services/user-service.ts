import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/types/user";

export async function getUserById(userId: string) {
  const client = await connectToDatabase();
  const db = client.db("pure-honey");
  const users = db.collection<User>("users");

  const user = await users.findOne({ userId }, { projection: { _id: 0 } });

  return user;
}
