import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header>This is dashboard page layout</header>
      {children}
    </div>
  );
}
