"use client";

import React, { useEffect } from "react";
import api from "../lib/axios";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const trySilentRefresh = async () => {
      try {
        await api.post("/accounts/token/refresh/");
      } catch (err) {
        console.warn("❌ Silent refresh failed", err);
        window.location.href = "/auth/login?reason=expired";
      }
    };
    trySilentRefresh();
  }, []);

  return <>{children}</>
}
