"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { debounce } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalAlertDialog } from "@/hooks/use-alert-dialog";
import GlobalDialog from "@/hooks/use-dialog";

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
        <ReactQueryDevtools initialIsOpen={false} />
        <TooltipProvider>
          <Toaster />
          {children}
          <GlobalDialog />
          <GlobalAlertDialog />
        </TooltipProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
