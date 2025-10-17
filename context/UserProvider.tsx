"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchUser } from "@/lib/fetch-user";
import type { User } from "@/types/user";

interface UserContextType {
  user: User | null;
  loading: boolean;
  error?: string;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

// Public routes where we don't fetch user
const publicRoutes = new Set(["/login", "/register", "/forgot-password"]);

// In-memory cache for user data (key → User)
const userCache = new Map<string, User | null>();

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip public routes
    if (publicRoutes.has(pathname)) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Use cached user if available
    if (userCache.has("user")) {
      setUser(userCache.get("user")!);
      setLoading(false);
      return;
    }

    // Fetch user from API
    let isMounted = true;
    setLoading(true);

    fetchUser()
      .then((data) => {
        if (!isMounted) return;
        userCache.set("user", data); // cache result
        setUser(data);
      })
      .catch(() => {
        if (!isMounted) return;
        setUser(null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use user context
export const useUser = () => useContext(UserContext);
