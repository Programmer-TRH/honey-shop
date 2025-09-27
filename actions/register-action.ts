"use server";

import { registerSchema } from "@/lib/shcema/zodSchema";

export async function registerAction(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // ✅ Validate again on server
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  // 👉 Save to DB, hash password, etc.
  // await db.user.create(...)

  return { success: true, error: null };
}
