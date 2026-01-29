"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/ToastContext";

export default function ClientRootLayout({ children }) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  );
}
