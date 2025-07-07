"use client";

import { useState } from "react";
import AdminSideBar from "../components/admin/AdminSideBar";
import ClientesRegistrados from "../components/admin/ClientesRegistrados";
import BaixaPagamento from "../components/admin/BaixaPagamento";
import Faturamento from "../components/admin/Faturamento";
import Agendamento from "../components/admin/Agendamento";
import AnimaisRegistrados from "../components/admin/AnimaisRegistrados";
import { Menu, Bell, Settings } from "lucide-react";
import "../styles/admin/AdminDashboard.css";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("faturamento");

  const renderContent = () => {
    switch (activeSection) {
      case "baixa-pagamento":
        return <BaixaPagamento />;
      case "faturamento":
        return <Faturamento />;
      case "clientes-registrados":
        return <ClientesRegistrados />;
      case "animais-registrados":
        return <AnimaisRegistrados />;
      case "agendamento":
        return <Agendamento />;
      default:
        return <Agendamento />;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSideBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="admin-main">
        <header className="admin-header">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>

          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={24} />
              <span className="notification-badge">3</span>
            </button>
            <button className="settings-btn">
              <Settings size={20} />
            </button>
            <div className="admin-info">
              <span>Admin - Maria Santos</span>
              <div className="admin-avatar">MS</div>
            </div>
          </div>
        </header>

        <main className="admin-content">{renderContent()}</main>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
