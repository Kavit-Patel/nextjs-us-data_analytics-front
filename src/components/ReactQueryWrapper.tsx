"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import Navbar from "./Navbar";
const queryClient = new QueryClient();
import { Toaster } from "react-hot-toast";

const ReactQueryWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryWrapper;
