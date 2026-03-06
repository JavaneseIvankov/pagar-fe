"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

const createQueryClient = () => {
  return new QueryClient();
};

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [qc] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={qc}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
}
