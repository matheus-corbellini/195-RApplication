import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../hooks/useAuth";
import AdminDashboard from "../pages/AdminDashboard";
import Faturamento from "../components/admin/Faturamento";
import BaixaPagamento from "../components/admin/BaixaPagamento";
import ClientesRegistrados from "../components/admin/ClientesRegistrados";
import AnimaisRegistrados from "../components/admin/AnimaisRegistrados";
import Agendamento from "../components/admin/Agendamento";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

export default function AppRoutes() {
  const { currentUser, userData, loading } = useAuth();

  // Mostra loading enquanto está carregando ou se o usuário está logado mas userData ainda não chegou
  if (loading || (currentUser && !userData)) {
    return <div>Carregando...</div>; // ou um spinner bonito
  }

  function getRedirectPath() {
    if (!currentUser) return null;
    if (userData?.role === "admin") return "/admin";
    return "/dashboard";
  }

  const redirectPath = getRedirectPath();

  return (
    <Routes>
      <Route
        path="/"
        element={
          redirectPath ? (
            <Navigate to={redirectPath} replace />
          ) : (
            <LandingPage />
          )
        }
      />
      <Route
        path="/login"
        element={
          redirectPath ? <Navigate to={redirectPath} replace /> : <LoginPage />
        }
      />
      <Route
        path="/register"
        element={
          redirectPath ? (
            <Navigate to={redirectPath} replace />
          ) : (
            <RegisterPage />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          <UserRoute>
            <Dashboard />
          </UserRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      >
        <Route path="faturamento" element={<Faturamento />} />
        <Route path="baixa-pagamento" element={<BaixaPagamento />} />
        <Route path="clientes-registrados" element={<ClientesRegistrados />} />
        <Route path="animais-registrados" element={<AnimaisRegistrados />} />
        <Route path="agendamento-cremacoes" element={<Agendamento />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
