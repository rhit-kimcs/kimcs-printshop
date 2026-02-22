import type { UserDTO } from "@print-shop/backend";
import React, { createContext, useContext, useMemo } from "react";

export interface AuthContextType {
  cid: string;
  auth: UserDTO | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  roles: string[];
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => {
    // Placeholder for authentication logic
    const auth: UserDTO = {
      id: 1,
      cid: "C123456",
      first: "Jessica",
      last: "Smith",
      email: "smith21@rose-hulman.edu",
      phone: "555-123-4567",
      default_did: 1,
    };
    return {
      cid: auth.cid,
      auth,
      isLoading: false,
      isAuthenticated: true,
      roles: ["user"],
      login: async () => {},
      logout: async () => {},
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
