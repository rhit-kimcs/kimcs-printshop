import { StrictMode } from "react";
import { Outlet } from "react-router";
import "../index.css";
import { AuthProvider } from "../contexts/auth-context";
import { queryClient } from "../utils/trpc";
import { QueryClientProvider } from "@tanstack/react-query";

export function RootLayout() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
