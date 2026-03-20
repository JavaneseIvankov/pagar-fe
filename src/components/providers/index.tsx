"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { debounce } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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
      <NuqsAdapter defaultOptions={{ limitUrlUpdates: debounce(500) }}>
        <Toaster />
        {children}
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
