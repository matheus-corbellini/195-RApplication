import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextDef";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
