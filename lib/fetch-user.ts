import { User } from "@/types/user";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export async function fetchUser(): Promise<User | null> {
  try {
    const res = await fetch("/api/user", {
      cache: "force-cache",
      credentials: "include",
    });

    if (!res.ok) {
      return null;
    }

    const json: ApiResponse<User> = await res.json();
    return json?.success ? json.data ?? null : null;
  } catch (err) {
    return null;
  }
}
