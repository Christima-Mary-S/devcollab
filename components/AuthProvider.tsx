// components/AuthProvider.tsx
"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "./ui/NavBar";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
