export type User = {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  avatar: string;
  created_at: Date;
  updated_at: Date;
};
