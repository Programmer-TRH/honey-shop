"use client";

import { getUserWishlistIdsAction } from "@/actions/wishlist-actions";
import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlistSet: Set<string>;
  isLoading: boolean;
  isWishlisted: (productId: string) => boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  removeFromWishlistAll: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistSet, setWishlistSet] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      const ids = await getUserWishlistIdsAction();
      if (ids) {
        setWishlistSet(new Set(ids));
      }
      setIsLoading(false);
    };
    loadWishlist();
  }, []);

  const isWishlisted = (productId: string) => wishlistSet.has(productId);

  const addToWishlist = (productId: string) => {
    setWishlistSet((prev) => new Set(prev).add(productId));
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  const removeFromWishlistAll = () => {
    setWishlistSet(new Set()); // clear all
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistSet,
        isLoading,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        removeFromWishlistAll,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
