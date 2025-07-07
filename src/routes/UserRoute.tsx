import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function UserRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, userData } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (userData?.role === "admin") return <Navigate to="/admin" replace />;

  return <>{children}</>;
}
