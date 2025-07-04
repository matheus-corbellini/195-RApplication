"use client";

import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import {
  Heart,
  FileText,
  Star,
  CreditCard,
  Home,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const menuItems = [
    {
      id: "registrar-animal",
      label: "Registre seu Animal",
      icon: <Heart size={20} />,
    },
    {
      id: "como-funciona",
      label: "Como Funciona o Processo",
      icon: <FileText size={20} />,
    },
    {
      id: "porque-escolher",
      label: "Por que nos Escolher?",
      icon: <Star size={20} />,
    },
    {
      id: "contratar-plano",
      label: "Contrate um Plano",
      icon: <CreditCard size={20} />,
    },
  ];

  const handleItemClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img
            src="/placeholder.svg?height=40&width=120"
            alt="PetCare Memorial"
          />
        </div>
        <button className="sidebar-close" onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="back-home">
          <Home size={16} /> Voltar ao início
        </Link>
        <button className="logout-btn">
          <LogOut size={16} /> Sair
        </button>
      </div>
    </aside>
  );
}
