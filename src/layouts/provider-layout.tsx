"use client";

import { createQueryClient } from "@/services/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type ClientLayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [queryClient] = useState(createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
