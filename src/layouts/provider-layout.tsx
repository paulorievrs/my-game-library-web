"use client";

import { createQueryClient } from "@/services/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type ProviderLayoutProps = {
  children: React.ReactNode;
};

export default function ProviderLayout({ children }: ProviderLayoutProps) {
  const [queryClient] = useState(createQueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
