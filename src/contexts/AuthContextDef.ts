import { createContext } from "react";
import type { User, UserCredential } from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  userData: import("../type/user").User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
