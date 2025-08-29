"use client";

import React from "react";
import Navbar from "../ui/user/Navbar";
import AuthProvider from "../providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col w-full h-full min-h-dvh lg:container lg:mx-auto p-7 gap-7 overflow-hidden">
          <Navbar />
          <div className="grow shrink basis-0 flex flex-col w-full h-[calc(100vh0-142px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}
