"use client";

import { useTokenHeartbeat } from "@/hooks/use-token-heartbeat";
import { UserProvider } from "./UserProvider";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useTokenHeartbeat(); // starts the heartbeat

  return <UserProvider>{children}</UserProvider>;
}
