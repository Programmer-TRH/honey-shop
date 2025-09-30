export default async function fetchUser() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/api/user`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      next: { tags: ["user"] },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch user");
    }

    const data = await res.json();
    return data.data;
  } catch (error: any) {
    console.log("Error fetching user:", error.message);
    return null;
  }
}
