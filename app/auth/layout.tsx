import React from "react";
import Navbar from "../ui/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-full min-h-dvh bg-gradient-to-r from-blue-500 to-indigo-600">
      <Navbar />
      <div className="flex flex-col w-full h-[calc(100vh-172px)] items-center justify-center px-7">
        {children}
      </div>
    </div>
  );
}
