"use client";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MotionConfig } from "motion/react";
import { debounce } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import {
  handleClientApiError,
  isAuthSessionExpiredError,
} from "@/lib/api/client-error-handling";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalAlertDialog } from "@/hooks/use-alert-dialog";
import GlobalDialog from "@/hooks/use-dialog";
import { useMotionPreferences } from "@/hooks/use-motion-preferences";
import { MOTION_TRANSITIONS } from "@/lib/motion/tokens";

const createQueryClient = () => {
  let queryClient: QueryClient;
  const queryStaleTimeMs = 30 * 1000;
  const handleError = (error: unknown) => {
    handleClientApiError(error, {
      notify: (message) => {
        toast.error(message);
      },
      onAuthExpired: () => {
        queryClient.clear();
      },
    });
  };

  queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
    defaultOptions: {
      queries: {
        staleTime: queryStaleTimeMs,
        retry: (failureCount, error) =>
          !isAuthSessionExpiredError(error) && failureCount < 2,
      },
    },
  });

  return queryClient;
};

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [qc] = useState(() => createQueryClient());
  const { reducedMotionMode } = useMotionPreferences();

  return (
    <QueryClientProvider client={qc}>
      <NuqsAdapter defaultOptions={{ limitUrlUpdates: debounce(500) }}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MotionConfig
          reducedMotion={reducedMotionMode}
          transition={MOTION_TRANSITIONS.baseOut}
        >
          <TooltipProvider>
            <Toaster />
            {children}
            <GlobalDialog />
            <GlobalAlertDialog />
          </TooltipProvider>
        </MotionConfig>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
