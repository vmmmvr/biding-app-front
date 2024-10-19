// components/ReactQueryWrapper.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Create a wrapper component to provide React Query context
const ReactQueryWrapper = ({ children }: { children: React.ReactNode }) => {
  // Create a single instance of the QueryClient for the entire app
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryWrapper;
