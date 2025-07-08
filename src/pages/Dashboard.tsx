"use client";

import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import RegistrarAnimal from "../components/dashboard/RegistrarAnimal";
import ComoFunciona from "../components/dashboard/ComoFunciona";
import PorqueEscolher from "../components/dashboard/PorqueEscolher";
import ContratarPlano from "../components/dashboard/ContratarPlano";
import AgendarServico from "../components/dashboard/AgendarServico";
import "../styles/dashboard/Dashboard.css";
import { Menu } from "lucide-react";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("registrar-animal");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "registrar-animal":
        return <RegistrarAnimal />;
      case "como-funciona":
        return <ComoFunciona />;
      case "porque-escolher":
        return <PorqueEscolher />;
      case "contratar-plano":
        return <ContratarPlano />;
      case "agendar-servico":
        return <AgendarServico />;
      default:
        return <RegistrarAnimal />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="user-info">
            <span>Bem-vindo, João Silva</span>
            <div className="user-avatar">JS</div>
          </div>
        </header>

        <main className="dashboard-content">{renderContent()}</main>
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
